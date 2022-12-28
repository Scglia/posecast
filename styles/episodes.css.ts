import { style, globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  background:
    "linear-gradient(to bottom, rgba(14,14,14,1) 0%,rgba(22,22,22,1) 32%)",
});

export const podcastDetailsBox = style({
  padding: "24px 24px 40px 24px",
});

export const episodesBox = style({
  padding: "16px 12px 120px 12px",
  background: "rgb(0,0,0)",
});
