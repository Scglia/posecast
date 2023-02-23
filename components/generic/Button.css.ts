import {
  style,
  globalStyle,
  styleVariants,
  keyframes,
} from "@vanilla-extract/css";
import { semiBold } from "../../styles/fonts.css";

export const box = style([
  semiBold,
  {
    position: "relative",
    border: "none",
    borderRadius: "5px",
    display: "inline-flex",
    alignItems: "flex-end",
    padding: 8,
    cursor: "pointer",
    boxShadow: "0 4px 4px 2px rgb(0 0 0 / 35%)",
    textDecoration: "none",
    fontFamily: "inherit",
    fill: "rgb(38, 38, 38)",
  },
]);

export const button = styleVariants({
  primary: [
    box,
    { backgroundColor: "rgb(255, 255, 255)", color: "rgb(38,38,38)" },
  ],
  secondary: [
    box,
    { backgroundColor: "rgb(33, 33, 33)", color: "rgb(186, 186, 186)" },
  ],
  tertiary: [
    box,
    {
      backgroundColor: "transparent",
      color: "rgb(186, 186, 186)",
      textDecoration: "underline",
    },
  ],
  error: [
    box,
    {
      backgroundColor: "rgb(170, 56, 56)",
      color: "white",
      fill: "unset",
    },
  ],
});

export const loading = style({
  display: "flex",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "none",
});

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loadingStyle = style({
  animation: `${rotate} 1s infinite linear`,
  width: "20px",
  height: "20px",
});

globalStyle(`${box} svg`, {
  height: "20px",
  width: "20px",
  boxShadow: "none",
});

export const buttonLink = style({
  textDecoration: "none",
});
