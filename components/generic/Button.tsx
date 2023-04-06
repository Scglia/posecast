import React from "react";
import classNames from "classnames";
import { button, loading, loadingStyle } from "./Button.css";
import LoadingIcon from "../../resources/icons/loading.svg";

type ButtonProps = {
  icon?: any;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: keyof typeof button;
  status?: "LOADING";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  icon = undefined,
  children = null,
  onClick = undefined,
  variant = "primary",
  status = undefined,
  ...args
}: ButtonProps) {
  const isIcon = icon !== undefined;
  const isDisabled = status === "LOADING";

  return (
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
  );
}
