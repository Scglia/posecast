import "../styles/global.css";
import { addPodcastBox, podcastListBox } from "../styles/podcasts.css";
import DynamicPodcastList from "../components/podcast-list/DynamicPodcastList";
import { useState } from "react";
import usePodcastsStore from "../stores/podcastsStore";
import InputWithButton from "../components/input-with-button/InputWithButton";

export default function Podcasts() {
  const [newRSSFeed, setNewRSSFeed] = useState("");
  const addPodcastFromRSS = usePodcastsStore(
    (state: any) => state.addPodcastFromRSS
  );
  const inputFetchStatus = usePodcastsStore((state: any) => state.fetchStatus);

  return (
    <>
      <div className={addPodcastBox}>
        <InputWithButton
          inputValue={newRSSFeed}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setNewRSSFeed(event.currentTarget.value ?? "");
          }}
          placeholder="rss feed"
          onClick={() => {
            addPodcastFromRSS(newRSSFeed);
            setNewRSSFeed("");
          }}
          buttonText="add"
          fetchStatus={inputFetchStatus}
        />
      </div>
      <div className={podcastListBox}>
        <DynamicPodcastList />
      </div>
    </>
  );
}
