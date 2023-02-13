import { placeholder } from "./Placeholder.css";

export default function Placeholder({
  url,
  height,
}: {
  url: string;
  height: number;
}) {
  return (
    <div
      className={placeholder}
      style={{
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        height: height,
      }}
    ></div>
  );
}
