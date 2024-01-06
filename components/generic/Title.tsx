import Head from "next/head";
import usePlayerStore from "../../stores/playerStore";

const Title = () => {
  const title = usePlayerStore((state: any) => state.title ?? "posecast");
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
    </>
  );
};

export default Title;
