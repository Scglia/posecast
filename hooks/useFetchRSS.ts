import { useQuery } from "@tanstack/react-query";

async function fetchRSS(url: string) {
  const response = await fetch(`/api/fetch-rss?url=${encodeURIComponent(url)}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function useFetchRSS(url: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["rss", url],
    queryFn: () => fetchRSS(url),
    enabled: !!url,
  });

  console.log(data);
  return { data, error, isLoading };
}
