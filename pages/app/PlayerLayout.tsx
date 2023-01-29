import { useEffect } from "react";
import DynamicPlayer from "../../components/player/DynamicPlayer";
import { playerBox } from "../../styles/global.css";

export default function PlayerLayout({ children }: { children: any }) {
  // Prevent right click menu to enable long press on mobile
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }, []);

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
