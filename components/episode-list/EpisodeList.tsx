import { box } from "./EpisodeList.css";
import { regular } from "../../styles/fonts.css";
import EpisodeListItem from "./EpisodeListItem";
import useFetchRSS from "../../hooks/useFetchRSS";
import usePlayerStore from "../../stores/playerStore";

const EpisodeList = ({ rssFeed }: { rssFeed: any }) => {
  const { data, error, isLoading } = useFetchRSS(rssFeed);
  const episodes = data?.items;

  const setPlayerData = usePlayerStore((state: any) => state.setPlayerData);
  const episodeId = usePlayerStore((state: any) => state.episodeId);

  if (isLoading) return <p className={regular}>Loading...</p>;
  if (error) return <p className={regular}>{error}</p>;
  if (!data) return <p className={regular}>No data</p>;

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
