import { box } from "./PodcastList.css";
import PodcastListItem from "./PodcastListItem";

const PodcastList = ({ podcasts }: { podcasts: any }) => {
  return (
    <div className={box}>
      {podcasts.map((item: any) => {
        return (
          <PodcastListItem
            podcastImageUrl={item.imageUrl}
            podcastTitle={item.title}
          />
        );
      })}
    </div>
  );
};

export default PodcastList;
