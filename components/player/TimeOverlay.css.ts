import { style } from "@vanilla-extract/css";
import { semiBold } from "../../styles/fonts.css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.8)",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  overscrollBehavior: "contain",
});

export const box = style({
  backgroundColor: "rgb(33, 33, 33)",
  padding: "24px 32px",
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
});

export const text = style([
  semiBold,
  {
    fontSize: 24,
    lineHeight: "120%",
    fontVariantNumeric: "tabular-nums",
  },
]);

export const progressBar = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 8,
  borderRadius: 4,
  backgroundColor: "rgb(51, 51, 51)",
});
