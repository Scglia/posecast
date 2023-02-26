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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addPodcastFromRSS(newRSSFeed);
    setNewRSSFeed("");
  }
  return (
    <>
      <form className={addPodcastBox} onSubmit={handleSubmit}>
        <InputWithButton
          inputValue={newRSSFeed}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setNewRSSFeed(event.currentTarget.value ?? "");
          }}
          placeholder="rss feed"
          buttonText="add"
          fetchStatus={inputFetchStatus}
        />
      </form>
      <div className={podcastListBox}>
        <DynamicPodcastList />
      </div>
    </>
  );
}
