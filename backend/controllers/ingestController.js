import Content from "../models/contentModel.js";
import User from "../models/userModel.js";
import { fetchYouTubeMetadata, fetchYouTubeTranscriptText } from "../configs/youtube.js";
import { cleanAndChunkContent } from "../configs/chunking.js";

// Preview YouTube Video and Transcript
export const previewYoutube = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "YouTube URL is required." });
    }

    // Fetch Metadata
    const metadata = await fetchYouTubeMetadata(url);

    // Fetch Transcript
    const rawTranscript = await fetchYouTubeTranscriptText(url);

    // Clean and Chunk
    const chunks = await cleanAndChunkContent(rawTranscript, "video");

    return res.status(200).json({
      success: true,
      data: {
        metadata,
        chunks,
        rawTranscript,
      },
    });
  } catch (error) {
    console.error("YouTube Preview Error:", error);
    return res.status(500).json({ error: error.message || "Failed to process YouTube URL." });
  }
};

// Ingest Content
export const ingestContent = async (req, res) => {
  try {
    const { title, content, tags, url, type, preChunkedData, youtubeMetadata } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    // Role validation
    const user = await User.findById(req.userId).select("role");
    if (!user || user.role !== "educator") {
      return res.status(403).json({ error: "Forbidden. Educators only." });
    }

    // Prevent duplicate ingestion
    if (url) {
      const existing = await Content.findOne({ url });
      if (existing) {
        return res.status(400).json({ error: `Content with URL ${url} has already been ingested.` });
      }
    }

    // Process chunks
    let finalChunks = [];
    if (preChunkedData && preChunkedData.length > 0) {
      finalChunks = preChunkedData.map((c, index) => ({
        text: c.text,
        topic: c.topic,
        startTime: c.startTime || "",
        endTime: c.endTime || "",
        chunkIndex: index,
      }));
    } else {
      const rawChunks = await cleanAndChunkContent(content, type || "text");
      finalChunks = rawChunks.map((c, index) => ({
        text: c.text,
        topic: c.topic,
        startTime: c.startTime || "",
        endTime: c.endTime || "",
        chunkIndex: index,
      }));
    }

    // Create DB Entry
    const newContent = await Content.create({
      title,
      rawContent: content,
      chunks: finalChunks,
      url: url || "",
      type: type || "text",
      tags: tags || [],
      ...(youtubeMetadata && {
        videoId: youtubeMetadata.videoId,
        channelName: youtubeMetadata.channelName,
        thumbnailUrl: youtubeMetadata.thumbnailUrl,
      }),
    });

    return res.status(201).json({
      success: true,
      message: "Content ingested successfully into Knowledge Base.",
      data: newContent,
    });
  } catch (error) {
    console.error("Ingestion Error:", error);
    return res.status(500).json({ error: error.message || "Failed to ingest content." });
  }
};

// Retrieve all ingested content (for listing/educator panel)
export const getIngestedContent = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("role");
    if (!user || user.role !== "educator") {
      return res.status(403).json({ error: "Forbidden. Educators only." });
    }

    const contents = await Content.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, contents });
  } catch (error) {
    console.error("Fetch Ingested Content Error:", error);
    return res.status(500).json({ error: "Server error while fetching knowledge base." });
  }
};

// Delete Ingested Content
export const deleteIngestedContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Role validation
    const user = await User.findById(req.userId).select("role");
    if (!user || user.role !== "educator") {
      return res.status(403).json({ error: "Forbidden. Educators only." });
    }

    const content = await Content.findByIdAndDelete(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Content deleted successfully from Knowledge Base.",
    });
  } catch (error) {
    console.error("Delete Ingested Content Error:", error);
    return res.status(500).json({ error: "Server error while deleting content." });
  }
};
