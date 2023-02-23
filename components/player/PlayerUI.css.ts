import { style, keyframes } from "@vanilla-extract/css";
import { regular, semiBold } from "../../styles/fonts.css";

export const box = style({
  display: "flex",
  gap: 12,
  backgroundColor: "rgb(33, 33, 33)",
  borderRadius: 12,
  padding: 12,
  transition: "visibility 0s, opacity 0.5s ease-out, transform 0.5s ease-out",
  transform: "translateY(0)",
  opacity: "1",
});

export const hiddenBox = style({
  transform: "translateY(30%)",
  opacity: "0",
});

export const episodeImage = style({
  position: "relative",
  margin: -2,
  marginRight: 0,
  borderRadius: 5,
  boxShadow: "0 4px 8px 4px rgba(0, 0, 0, 30%)",
  overflow: "hidden",
  height: 72,
  flexShrink: 0,
});

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loadingBox = style({
  position: "absolute",
  background: "rgba(0, 0, 0, 0.9)",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const loadingStyle = style({
  animation: `${rotate} 1s infinite linear`,
});

export const contentBox = style({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  flexGrow: 1,
  overflow: "hidden",
});

export const title = style([
  semiBold,
  {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
]);

export const bottomLine = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 6,
});

export const times = style([
  regular,
  {
    fontVariantNumeric: "tabular-nums",
  },
]);

export const buttons = style({
  display: "flex",
  gap: 12,
});
