import { YoutubeTranscript } from "youtube-transcript";

export function getYouTubeVideoId(url) {
  const cleanUrl = typeof url === 'string' ? url.trim() : '';
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/;
  const match = cleanUrl.match(regExp);

  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Invalid YouTube URL.");
  }
}

export async function fetchYouTubeMetadata(url) {
  const videoId = getYouTubeVideoId(url);
  const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  try {
    const res = await fetch(oEmbedUrl);
    if (!res.ok) {
      throw new Error("Could not fetch YouTube metadata.");
    }
    const data = await res.json();

    return {
      title: data.title,
      channelName: data.author_name,
      thumbnailUrl: data.thumbnail_url,
      videoId,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch (error) {
    // Return standard fallback metadata if oEmbed fails
    return {
      title: `YouTube Video (${videoId})`,
      channelName: "YouTube Creator",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      videoId,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export async function fetchYouTubeTranscriptText(url) {
  const videoId = getYouTubeVideoId(url);

  let transcriptObj;
  try {
    transcriptObj = await YoutubeTranscript.fetchTranscript(videoId);
  } catch (error) {
    console.log("Transcript fetch failed, trying fallback...", error);
    try {
      transcriptObj = await fetchTranscriptFallback(videoId);
    } catch (fallbackError) {
      console.error("Fallback transcript fetch error:", fallbackError);
      throw new Error("Failed to fetch transcript. Make sure the video has captions/subtitles enabled.");
    }
  }

  if (!transcriptObj || transcriptObj.length === 0) {
    throw new Error("Failed to fetch transcript. Make sure captions are enabled on the video.");
  }

  // Format transcript with timestamps so Gemini can map chunks
  const rawText = transcriptObj.map((t) => {
    const startTime = formatDuration(t.offset);
    const text = t.text.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    return `${startTime}\n${text}`;
  }).join("\n\n");

  return rawText;
}

async function fetchTranscriptFallback(videoId) {
  const targetUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';
  
  const fetchStrategies = [
    () => fetch(targetUrl, { headers: { 'User-Agent': userAgent, 'Accept-Language': 'en-US,en;q=0.9' } }),
    () => fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(targetUrl)}`),
    () => fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`)
  ];

  let html = "";
  for (const strategy of fetchStrategies) {
    try {
      const res = await strategy();
      if (res.ok) {
        const text = await res.text();
        if (text.includes('ytInitialPlayerResponse')) {
          html = text;
          break;
        }
      }
    } catch (e) {
      console.log("A transcript fetch strategy failed, trying next...");
    }
  }

  const match = html.match(/ytInitialPlayerResponse\s*=\s*({.+?})\s*;/);
  if (!match) throw new Error("No player response found");

  const playerResponse = JSON.parse(match[1]);
  const tracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
  if (!tracks || tracks.length === 0) throw new Error("No captions found");

  const track = tracks.find((t) => t.languageCode === 'en') || tracks[0];

  const xmlRes = await fetch(track.baseUrl);
  if (!xmlRes.ok) throw new Error("Failed to fetch XML transcript data");
  const xmlText = await xmlRes.text();

  const textNodes = [...xmlText.matchAll(/<text[^>]*?(?:start="([^"]+)"|t="([^"]+)")[^>]*?>([\s\S]*?)<\/text>/g)];
  
  if (textNodes.length === 0) throw new Error("Failed to parse XML");

  return textNodes.map(match => {
    const startStr = match[1] || match[2];
    const start = parseFloat(startStr) * 1000;
    const text = match[3]
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"');
    return { offset: start, text };
  });
}
