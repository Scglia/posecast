import { placeholder } from "./Placeholder.css";

type placeholderProps = {
  url: string;
  height: number;
};

export default function Placeholder({ url, height }: placeholderProps) {
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
