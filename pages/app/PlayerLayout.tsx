import { PlayerProvider } from "../../contexts/PlayerContext";
import PlayerWithAudio from "../../components/player/PlayerWithAudio";
import { playerBox } from "../../styles/global.css";

export default function PlayerLayout({ children }: { children: any }) {
  return (
    <>
      <main>
        <PlayerProvider>
          {children}
          <div className={playerBox}>
            <PlayerWithAudio />
          </div>
        </PlayerProvider>
      </main>
    </>
  );
}
