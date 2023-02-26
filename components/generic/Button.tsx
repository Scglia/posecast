import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { buttonLink, button, loading, loadingStyle } from "./Button.css";
import LoadingIcon from "../../resources/icons/loading.svg";

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
  variant = "primary",
  href = undefined,
  status = undefined,
  ...args
}: {
  icon?: any;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: keyof typeof button;
  href?: string;
  status?: "LOADING";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const isIcon = icon !== undefined;
  const isDisabled = status === "LOADING";

  return (
    <ConditionalLink href={href}>
      <button
        disabled={isDisabled}
        onClick={onClick}
        className={button[variant]}
        {...args}
      >
        {children ? <div>{children}</div> : null}
        {isIcon ? icon : null}
        {status === "LOADING" ? (
          <div className={classNames(button[variant], loading)}>
            <div className={loadingStyle}>
              <LoadingIcon />
            </div>
          </div>
        ) : null}
      </button>
    </ConditionalLink>
  );
}
