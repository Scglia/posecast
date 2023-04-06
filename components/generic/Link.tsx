import NextLink from "next/link";
import { linkStyle, LinkVariantsType } from "./Link.css";

type LinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: LinkVariantsType;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({
  children,
  variant = "default",
  ...props
}: LinkProps) {
  return (
    <NextLink className={linkStyle[variant]} {...props}>
      {children}
    </NextLink>
  );
}
