import { style, globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  margin: 0,
  background: "black",
});

export const playerBox = style({
  position: "fixed",
  padding: 12,
  bottom: 0,
  left: 0,
  right: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.89) 100%)",
});
