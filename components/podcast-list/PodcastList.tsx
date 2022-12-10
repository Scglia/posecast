import Link from "next/link";
import { box } from "./PodcastList.css";
import PodcastListItem from "./PodcastListItem";

const PodcastList = ({ podcasts }: { podcasts: any }) => {
  return (
    <div className={box}>
      {podcasts.map((item: any, index: number) => {
        return (
          <Link
            key={item.id}
            href={`/episodes/${index}`}
            style={{ textDecoration: "none" }}
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
