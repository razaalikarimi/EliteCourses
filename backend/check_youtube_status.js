const run = async () => {
  const urls = [
    "https://www.youtube.com/watch?v=0IciwnJ6PJI",
    "https://www.youtube.com/watch?v=kYgGwUpZM7U"
  ];

  for (const url of urls) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      console.log(`URL: ${url}`);
      console.log(`  Status: ${res.status} ${res.statusText}`);
      if (res.ok) {
        const data = await res.json();
        console.log(`  Title: ${data.title}`);
        console.log(`  Author: ${data.author_name}`);
      } else {
        console.log(`  Failed: ${await res.text()}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
};

run();
