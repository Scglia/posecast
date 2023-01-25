import Link from "next/link";
import React from "react";
import { buttonLink, button } from "./Button.css";

const ConditionalLink = ({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) => {
  return href ? (
    <Link href={href} className={buttonLink}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default function Button({
  icon = undefined,
  children = null,
  onClick = undefined,
  type = "primary",
  href = undefined,
}: {
  icon?: any;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: keyof typeof button;
  href?: string;
}) {
  const isIcon = icon !== undefined;

  return (
    <ConditionalLink href={href}>
      <button onClick={onClick} className={button[type]}>
        {children ? <div>{children}</div> : null}
        {isIcon ? icon : null}
      </button>
    </ConditionalLink>
  );
}
