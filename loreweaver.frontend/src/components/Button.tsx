import { type MouseEventHandler, type CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  disable?: boolean;
  type: "primary" | "danger" | "success" | "secundary";
}

const Button = ({ text, className, onClick, style, type, disable }: Props) => {
  let css = "p-2 rounded-xl shadow-xl cursor-pointer ";

  switch (type) {
    case "danger":
      css += "bg-red-500 ";
      break;
    case "primary":
      css += "bg-blue-500 ";
    case "secundary":
      css += "border-blue-500 border-2 ";
      break;
    case "success":
      css += "bg-green-500 ";
  }

  if (className) css += className;

  return (
    <button className={css} onClick={onClick} style={style} disabled={disable}>
      {text}
    </button>
  );
};

export default Button;
