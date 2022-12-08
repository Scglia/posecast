import { style, globalStyle } from "@vanilla-extract/css";
import { regular } from "../../styles/fonts.css";

export const box = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: 12,
  padding: 12,
});

globalStyle(`${box}.selected`, {
  backgroundColor: "rgb(33, 33, 33)",
});

export const metadata = style([
  regular,
  {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "rgb(186, 186, 186)",
    paddingTop: 6,
  },
]);
