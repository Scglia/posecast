import Link from "next/link";
import { useState } from "react";
import { useLongPress } from "use-long-press";
import usePodcastsStore from "../../stores/podcastsStore";
import { linkStyle } from "../../styles/global.css";
import Loading from "./Loading";
import { box } from "./PodcastList.css";
import PodcastListItem from "./PodcastListItem";

const PodcastList = () => {
  const podcasts = usePodcastsStore((state: any) => state.podcasts);
  const fetchStatus = usePodcastsStore((state: any) => state.fetchStatus);
  const removePodcast = usePodcastsStore((state: any) => state.removePodcast);
  const [selectedPodcast, setSelectedPodcast] = useState("");

  const longPress = useLongPress(
    (event, { context }) => {
      event.preventDefault();
      event.stopPropagation();
      setSelectedPodcast(context as string);
    },
    { captureEvent: true }
  );

  return (
    <>
      {fetchStatus === "LOADING" ? <Loading /> : null}
      <div className={box}>
        {podcasts.map((item: any) => {
          const { id, title, imageUrl } = item;
          const isSelected = selectedPodcast === id;
          if (isSelected) {
            return (
              <PodcastListItem
                key={`${id}-selected`}
                podcastImageUrl={imageUrl}
                podcastTitle={title}
                isSelected={true}
                removePodcast={() => {
                  removePodcast(id);
                }}
              />
            );
          }

          return (
            <Link
              key={id}
              href={`/episodes/${id}`}
              className={linkStyle}
              {...longPress(id)}
            >
              <PodcastListItem
                podcastImageUrl={imageUrl}
                podcastTitle={title}
                isSelected={false}
                removePodcast={() => {}}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default PodcastList;
