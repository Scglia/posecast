import { regular } from "../../styles/fonts.css";
import { box } from "./Button.css";

export default function Button({
  icon,
  children,
  onClick,
}: {
  icon: any;
  children?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const isIcon = icon !== undefined;
  return (
    <button onClick={onClick} className={box}>
      {children ? <div className={regular}>{children}</div> : null}
      {isIcon ? icon : null}
    </button>
  );
}
