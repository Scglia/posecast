import { style, globalStyle } from "@vanilla-extract/css";

export const box = style({
  border: "none",
  borderRadius: "5px",
  display: "flex",
  alignItems: "flex-end",
  padding: 8,
  backgroundColor: "rgb(255, 255, 255)",
  cursor: "pointer",
  boxShadow: "0 4px 4px 2px rgb(0 0 0 / 35%)",
});

globalStyle(`${box} svg`, {
  height: "20px",
  width: "20px",
  fill: "rgb(38, 38, 38)",
});
