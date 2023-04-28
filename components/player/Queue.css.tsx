import { style } from "@vanilla-extract/css";
import { regular, semiBold } from "../../styles/fonts.css";

export const headline = style([
  semiBold,
  {
    color: "rgb(186, 186, 186)",
  },
]);

export const queueBox = style({
  display: "flex",
  paddingTop: 4,
  gap: 20,
  flexDirection: "column",
});

export const queueItem = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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
