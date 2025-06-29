import { type MouseEventHandler, type CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  type: "primary" | "danger" | "success";
}

const Button = ({ text, className, onClick, style, type }: Props) => {
  let css = "p-2 m-2 rounded-xl shadow-xl text-[#f5edd6] ";

  switch (type) {
    case "danger":
      css += "bg-red-500 ";
      break;
    case "primary":
      css += "bg-blue-500 ";
      break;
    case "success":
      css += "bg-green-500 ";
  }

  if (className) css += className;

  return (
    <button className={css} onClick={onClick} style={style}>
      {text}
    </button>
  );
};

export default Button;
