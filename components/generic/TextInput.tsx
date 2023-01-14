import { InputHTMLAttributes } from "react";
import { inputStyle } from "./TextInput.css";

export default function TextInput(
  attributes: InputHTMLAttributes<HTMLInputElement>
) {
  return <input type="text" className={inputStyle} {...attributes} />;
}
