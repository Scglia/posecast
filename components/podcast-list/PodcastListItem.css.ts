import { style } from "@vanilla-extract/css";

export const box = style({
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: 12,
  borderRadius: 12,
  ":active": {
    backgroundColor: "rgb(33, 33, 33)",
  },
});

export const selectedBox = style({
  backgroundColor: "rgb(33, 33, 33)",
});

export const image = style({
  borderRadius: 4,
});

export const removeButtonBox = style({
  padding: 6,
});
