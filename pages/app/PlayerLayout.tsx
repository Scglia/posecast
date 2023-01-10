import DynamicPlayer from "../../components/player/DynamicPlayer";
import { playerBox } from "../../styles/global.css";

export default function PlayerLayout({ children }: { children: any }) {
  return (
    <>
      <main>
        {children}
        <div className={playerBox}>
          <DynamicPlayer />
        </div>
      </main>
    </>
  );
}
