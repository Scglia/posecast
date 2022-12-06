import {
  box,
  episodeImage,
  contentBox,
  title,
  times,
  buttons,
  bottomLine,
} from "./Player.css";
import Button from "../generic/Button";
import RewindIcon from "../../resources/icons/rewind.svg";
import ForwardIcon from "../../resources/icons/forward.svg";
import PlayIcon from "../../resources/icons/play.svg";
import PauseIcon from "../../resources/icons/pause.svg";

const Player = ({
  episodeImageUrl,
  episodeTitle,
  currentTime,
  episodeDuration,
  isPlaying,
}: {
  episodeImageUrl: string;
  episodeTitle: string;
  currentTime: string;
  episodeDuration: string;
  isPlaying: boolean;
}) => {
  return (
    <div className={box}>
      <img
        className={episodeImage}
        src={episodeImageUrl}
        height="72"
        width="72"
        alt={`Current episode illustration`}
      />
      <div className={contentBox}>
        <div className={title}>{episodeTitle}</div>
        <div className={bottomLine}>
          <div className={times}>
            {currentTime} / {episodeDuration}
          </div>
          <div className={buttons}>
            <Button
              icon={<RewindIcon />}
              onClick={() => console.log("hello")}
            />
            <Button
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              onClick={() => console.log("hello")}
            />
            <Button
              icon={<ForwardIcon />}
              onClick={() => console.log("hello")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
