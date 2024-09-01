import { box } from "./EpisodeList.css";
import { regular } from "../../styles/fonts.css";
import EpisodeListItem from "./EpisodeListItem";
import useFetchRSS from "../../hooks/useFetchRSS";
import usePlayerStore from "../../stores/playerStore";
import usePodcastsStore from "../../stores/podcastsStore";
import { useEffect } from "react";
import Loading from "./Loading";

type EpisodeListProps = {
  podcastId: string;
  rssFeed: string;
  filter: string;
};

const EpisodeList = ({ podcastId, rssFeed, filter }: EpisodeListProps) => {
  const { data, isLoading, error } = useFetchRSS(rssFeed);
  const setPlayerData = usePlayerStore((state: any) => state.setPlayerData);
  const episodeId = usePlayerStore((state: any) => state.episodeId);

  const setEpisodeQuantity = usePodcastsStore(
    (state: any) => state.setEpisodeQuantity
  );

  useEffect(() => {
    if (data) {
      setEpisodeQuantity(podcastId, data.items.length);
    }
  }, [data, podcastId, setEpisodeQuantity]);

  if (isLoading) return <Loading />;
  if (error)
    return <p className={regular}>This podcast couldn&apos;t be loaded</p>;
  if (!data) return null;

  const episodes = data.items.filter((item: any) => {
    return item.title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className={box}>
      {episodes.map((item: any, index: number) => {
        return (
          <div
            key={item.guid}
            onClick={() => {
              setPlayerData({
                imageUrl: data.image.url,
                title: item.title,
                episodeUrl: item.enclosure.url,
                episodeId: item.guid,
              });
            }}
          >
            <EpisodeListItem
              episodeTitle={item.title}
              episodeReleaseDate={item.pubDate}
              episodeDuration={item.itunes.duration}
              isSelected={item.guid === episodeId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EpisodeList;
