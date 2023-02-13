import { style, keyframes } from "@vanilla-extract/css";

const placeHolderShimmer = keyframes({
  "0%": { backgroundPosition: "-100vw 0" },
  "100%": { backgroundPosition: "100vw 0" },
});

export const placeholder = style({
  display: "flex",
  width: "100%",
  animationDuration: "2.8s",
  animationFillMode: "forwards",
  animationIterationCount: "infinite",
  animationName: placeHolderShimmer,
  animationTimingFunction: "linear",
  backgroundImage:
    "linear-gradient(to right, rgb(33, 33, 33) 2%, rgb(44, 44, 44) 18%, rgb(33, 33, 33) 33%)",
  backgroundSize: "100vw 72px",
  position: "relative",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
});
