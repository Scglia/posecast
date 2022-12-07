import { style, globalStyle } from "@vanilla-extract/css";

export const box = style({
  border: "none",
  borderRadius: "5px",
  display: "flex",
  alignItems: "flex-end",
  padding: 8,
  backgroundColor: "rgb(255, 255, 255)",
  cursor: "pointer",
});

globalStyle(`${box} svg`, {
  height: "20px",
  width: "20px",
  fill: "rgb(38, 38, 38)",
});
