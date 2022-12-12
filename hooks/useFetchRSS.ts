import { useEffect, useState } from "react";

export default function useFetchRSS(url: any) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(`/api/fetch-rss?url=${url}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, isLoading };
}
