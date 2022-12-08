import { style } from "@vanilla-extract/css";

export const box = style({
  display: "flex",
  gap: 18,
  alignItems: "center",
});

export const cover = style({
  borderRadius: 6,
  boxShadow: "0 4px 8px 4px rgba(0, 0, 0, 35%)",
});
