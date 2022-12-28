import {
  box,
  hiddenBox,
  episodeImage,
  contentBox,
  title,
  times,
  buttons,
  bottomLine,
} from "./PlayerUI.css";
import Button from "../generic/Button";
import RewindIcon from "../../resources/icons/rewind.svg";
import ForwardIcon from "../../resources/icons/forward.svg";
import PlayIcon from "../../resources/icons/play.svg";
import PauseIcon from "../../resources/icons/pause.svg";
import { MouseEventHandler } from "react";

const PlayerUI = ({
  episodeImageUrl,
  episodeTitle,
  currentTime,
  episodeDuration,
  isPlaying,
  setIsPlaying,
  rewind,
  fastForward,
}: {
  episodeImageUrl: string;
  episodeTitle: string;
  currentTime: number;
  episodeDuration: number;
  isPlaying: boolean;
  setIsPlaying: Function;
  rewind: MouseEventHandler;
  fastForward: MouseEventHandler;
}) => {
  return (
    <div className={episodeTitle ? box : hiddenBox}>
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
            <Button icon={<RewindIcon />} onClick={rewind} />
            <Button
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              onClick={() => setIsPlaying(!isPlaying)}
            />
            <Button icon={<ForwardIcon />} onClick={fastForward} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerUI;
