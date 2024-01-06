import { styleVariants } from "@vanilla-extract/css";
import { regular } from "../../styles/fonts.css";

const linkVariants = {
  default: [
    regular,
    {
      textOverflow: "ellipsis",
      maxWidth: "60%",
      color: "rgb(109, 179, 255)",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  ],
  unstyled: { textDecoration: "none", color: "inherit" },
};

export type LinkVariantsType = keyof typeof linkVariants;

export const linkStyle = styleVariants(linkVariants as any);
