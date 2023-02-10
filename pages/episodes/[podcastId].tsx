import { useRouter } from "next/router";
import "../../styles/global.css";
import { buttons } from "../../styles/global.css";
import {
  podcastDetailsBox,
  episodesBox,
  filterBox,
  stickyFilterBox,
  topSectionBox,
} from "../../styles/episodes.css";
import EpisodeList from "../../components/episode-list/EpisodeList";
import PodcastDetails from "../../components/podcast-details/PodcastDetails";
import Button from "../../components/generic/Button";
import TextInput from "../../components/generic/TextInput";
import { useState } from "react";
import usePodcastsStore from "../../stores/podcastsStore";
import { regular } from "../../styles/fonts.css";

export default function Episodes() {
  const [filter, setFilter] = useState("");
  const { podcastId } = useRouter().query;
  const podcasts = usePodcastsStore((state: any) => state.podcasts);
  const getPodcastById = (podcastsArray: any, id: string) => {
    return podcastsArray.find((podcastItem: any) => podcastItem.id === id);
  };
  const selectedPodcast = getPodcastById(podcasts, podcastId as string);

  if (selectedPodcast === undefined) {
    return <UnknownPodcast />;
  }

  return (
    <>
      <div className={topSectionBox}>
        <div className={podcastDetailsBox}>
          <div className={buttons}>
            <Button href={"/podcasts"} type="secondary">
              back
            </Button>
          </div>
          <PodcastDetails
            podcastImgUrl={selectedPodcast.imageUrl}
            podcastTitle={selectedPodcast.title}
            podcastDescription={selectedPodcast.description}
            podcastEpisodeQuantity={selectedPodcast.episodeQuantity}
            podcastWebsite={selectedPodcast.website}
          />
        </div>
      </div>
      <div className={filter === "" ? filterBox : stickyFilterBox}>
        <TextInput
          placeholder="filter"
          value={filter}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setFilter(event.currentTarget.value ?? "");
          }}
        />
      </div>
      <div className={episodesBox}>
        <EpisodeList
          podcastId={podcastId as string}
          rssFeed={selectedPodcast.rssFeed}
          filter={filter}
        />
      </div>
    </>
  );
}

function UnknownPodcast() {
  return (
    <div className={topSectionBox}>
      <div className={podcastDetailsBox}>
        <div className={buttons}>
          <Button href={"/podcasts"} type="secondary">
            back
          </Button>
        </div>
        <div className={regular}>unknown podcast index</div>
      </div>
    </div>
  );
}
