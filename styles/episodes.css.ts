import { style } from "@vanilla-extract/css";

export const topSectionBox = style({
  overflow: "auto",
});

export const podcastDetailsBox = style({
  padding: "24px 24px 24px 24px",
});

export const episodesBox = style({
  padding: "0 12px 120px 12px",
});

export const filterBox = style({
  padding: "16px 24px",
  position: "relative",
});

export const stickyFilterBox = style([
  filterBox,
  {
    position: "sticky",
    top: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.89) 50%)",
  },
]);
