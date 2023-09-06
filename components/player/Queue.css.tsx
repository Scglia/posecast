import { style } from "@vanilla-extract/css";
import { regular, semiBold } from "../../styles/fonts.css";

export const headline = style([
  semiBold,
  {
    color: "rgb(186, 186, 186)",
    paddingTop: 12,
  },
]);

export const queueBox = style({
  display: "flex",
  paddingTop: 4,
  gap: 20,
  flexDirection: "column",
  maxHeight: 250,
  overflowY: "auto",
});

export const queueItem = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

export const episodeName = style({
  flexGrow: 1,
  flexShrink: 1,
});

export const podcastName = style([
  regular,
  {
    color: "rgb(186, 186, 186)",
    paddingTop: 4,
  },
]);

export const reorder = style({
  flexGrow: 0,
  flexShrink: 0,
});
