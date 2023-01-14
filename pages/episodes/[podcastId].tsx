import { useRouter } from "next/router";
import "../../styles/global.css";
import { backButton } from "../../styles/global.css";
import {
  podcastDetailsBox,
  episodesBox,
  filterBox,
  stickyFilterBox,
  topSectionBox,
} from "../../styles/episodes.css";
import EpisodeList from "../../components/episode-list/EpisodeList";
import PodcastDetails from "../../components/podcast-details/PodcastDetails";
import podcastsData from "../../resources/data/podcastsData";
import Button from "../../components/generic/Button";
import TextInput from "../../components/generic/TextInput";
import { useState } from "react";

export default function Episodes() {
  const [filter, setFilter] = useState("");
  const { podcastId } = useRouter().query;

  if (podcastId === undefined) return <div>Unknown podcast index</div>;
  const selectedPodcast = podcastsData[podcastId as keyof typeof podcastsData];

  return (
    <>
      <div className={topSectionBox}>
        <div className={podcastDetailsBox}>
          <div className={backButton}>
            <Button href={"/podcasts"} type="secondary">
              back
            </Button>
          </div>
          <PodcastDetails
            podcastImgUrl={selectedPodcast.imageUrl}
            podcastTitle={selectedPodcast.title}
            podcastDescription={selectedPodcast.description}
            podcastEpisodeQuantity={0}
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
        <EpisodeList rssFeed={selectedPodcast.rssFeed} filter={filter} />
      </div>
    </>
  );
}
