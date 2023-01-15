import "../styles/global.css";
import { addPodcastBox, podcastListBox } from "../styles/podcasts.css";
import DynamicPodcastList from "../components/podcast-list/DynamicPodcastList";
import TextInput from "../components/generic/TextInput";
import { useState } from "react";
import Button from "../components/generic/Button";
import usePodcastsStore from "../stores/podcastsStore";

export default function Podcasts() {
  const [newRSSFeed, setNewRSSFeed] = useState("");
  const addPodcastFromRSS = usePodcastsStore(
    (state: any) => state.addPodcastFromRSS
  );

  return (
    <>
      <div className={addPodcastBox}>
        <TextInput
          placeholder="rss feed"
          value={newRSSFeed}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setNewRSSFeed(event.currentTarget.value ?? "");
          }}
        />
        <Button type="secondary" onClick={() => addPodcastFromRSS(newRSSFeed)}>
          add
        </Button>
      </div>
      <div className={podcastListBox}>
        <DynamicPodcastList />
      </div>
    </>
  );
}
