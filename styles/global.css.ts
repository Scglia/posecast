import { style, globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  margin: 0,
  background:
    "linear-gradient(to bottom, rgba(14,14,14,1) 0%,rgba(22,22,22,1) 32%);",
  minHeight: "100%",
  color: "white",
});

globalStyle("*", {
  boxSizing: "border-box",
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

export const backButton = style({
  paddingBottom: "40px",
});

export const linkStyle = style({ textDecoration: "none", color: "inherit" });
