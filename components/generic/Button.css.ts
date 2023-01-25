import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { semiBold } from "../../styles/fonts.css";

export const box = style([
  semiBold,
  {
    border: "none",
    borderRadius: "5px",
    display: "inline-flex",
    alignItems: "flex-end",
    padding: 8,
    cursor: "pointer",
    boxShadow: "0 4px 4px 2px rgb(0 0 0 / 35%)",
    textDecoration: "none",
    fontFamily: "inherit",
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
});

globalStyle(`${box} svg`, {
  height: "20px",
  width: "20px",
  fill: "rgb(38, 38, 38)",
  boxShadow: "none",
});

export const buttonLink = style({
  textDecoration: "none",
});
