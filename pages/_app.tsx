import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import PlayerLayout from "./app/PlayerLayout";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
    </main>
  );
}
