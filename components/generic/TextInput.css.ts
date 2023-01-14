import { style } from "@vanilla-extract/css";
import { regular } from "../../styles/fonts.css";

export const inputStyle = style([
  regular,
  {
    color: "rgb(186, 186, 186)",
    padding: 8,
    backgroundColor: "rgb(33, 33, 33)",
    width: "100%",
    borderRadius: 5,
    border: "none",
  },
]);
