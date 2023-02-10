import Link from "next/link";
import { useCallback, useState } from "react";
import useLongPress from "../../hooks/useLongPress";
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

  const selectPodcast = useCallback((event: TouchEvent, context: any) => {
    if (event.cancelable) {
      event.preventDefault();
    }
    setSelectedPodcast(context as string);
  }, []);

  const defaultOptions = {
    shouldPreventDefault: false,
    delay: 400,
  };

  const longPressSelectPodcast = useLongPress(
    selectPodcast,
    () => {},
    defaultOptions
  );

  const unselectPodcast = useCallback(() => {
    setSelectedPodcast("" as string);
  }, []);

  const longPressUnselectPodcast = useLongPress(
    unselectPodcast,
    () => {},
    defaultOptions
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
              <div key={`${id}-selected`} {...longPressUnselectPodcast()}>
                <PodcastListItem
                  podcastImageUrl={imageUrl}
                  podcastTitle={title}
                  isSelected={true}
                  removePodcast={() => {
                    removePodcast(id);
                  }}
                />
              </div>
            );
          }

          return (
            <Link
              key={id}
              href={`/episodes/${id}`}
              className={linkStyle}
              {...longPressSelectPodcast(id)}
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
