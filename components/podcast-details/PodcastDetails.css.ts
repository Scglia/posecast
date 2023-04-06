import { style } from "@vanilla-extract/css";
import { regular } from "../../styles/fonts.css";

export const box = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const metadata = style({
  display: "flex",
  justifyContent: "space-between",
});

export const episodeQuantity = style([
  regular,
  {
    color: "rgb(186, 186, 186)",
  },
]);
