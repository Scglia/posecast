import Link from "next/link";
import { linkStyle } from "../../styles/global.css";
import { box } from "./PodcastList.css";
import PodcastListItem from "./PodcastListItem";

const PodcastList = ({ podcasts }: { podcasts: any }) => {
  return (
    <div className={box}>
      {Object.values(podcasts).map((item: any) => {
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
