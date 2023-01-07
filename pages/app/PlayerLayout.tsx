import PlayerWithAudio from "../../components/player/PlayerWithAudio";
import { playerBox } from "../../styles/global.css";

export default function PlayerLayout({ children }: { children: any }) {
  return (
    <>
      <main>
        {children}
        <div className={playerBox}>
          <PlayerWithAudio />
        </div>
      </main>
    </>
  );
}
