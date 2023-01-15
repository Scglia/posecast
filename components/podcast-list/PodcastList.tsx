import Link from "next/link";
import { useEffect } from "react";
import usePodcastsStore from "../../stores/podcastsStore";
import { linkStyle } from "../../styles/global.css";
import { box } from "./PodcastList.css";
import PodcastListItem from "./PodcastListItem";

const PodcastList = () => {
  const podcasts = usePodcastsStore((state: any) => state.podcasts);

  return (
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
  );
};

export default PodcastList;
