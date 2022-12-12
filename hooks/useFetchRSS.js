import { useEffect, useState } from "react";

export default function useFetchRSS(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  console.log("url", url);
  useEffect(() => {
    console.log("useEffect");
    (async function () {
      try {
        setLoading(true);
        // const response = await fetch(`/api/fetch-rss?url=${url}`);
        const response = await fetch(
          `/api/fetch-rss?url=https://posecast.vercel.com/mock-rss.xml`
        );
        const jsonData = await response.json();
        console.log("response", response);
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, isLoading };
}
