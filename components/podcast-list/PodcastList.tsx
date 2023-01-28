import Link from "next/link";
import usePodcastsStore from "../../stores/podcastsStore";
import { linkStyle } from "../../styles/global.css";
import Loading from "./Loading";
import { box } from "./PodcastList.css";
import PodcastListItem from "./PodcastListItem";

const PodcastList = () => {
  const podcasts = usePodcastsStore((state: any) => state.podcasts);
  const fetchStatus = usePodcastsStore((state: any) => state.fetchStatus);

  return (
    <>
      {fetchStatus === "LOADING" ? <Loading /> : null}
      <div className={box}>
        {podcasts.map((item: any) => {
          return (
            <Link
              key={item.id}
              href={`/episodes/${item.id}`}
              className={linkStyle}
            >
              <PodcastListItem
                podcastImageUrl={item.imageUrl}
                podcastTitle={item.title}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default PodcastList;
