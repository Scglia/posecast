import { box } from "./PodcastListItem.css";
import { loading } from "./Loading.css";

export default function Loading() {
  return (
    <div className={box}>
      <div className={loading}></div>
    </div>
  );
}
