import Link from "next/link";
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
