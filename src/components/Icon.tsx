import type { JSX as ReactJSX } from "react/jsx-runtime";
import { type CSSProperties } from "react";

interface Props {
  name: "icon-right-open" | "icon-plus-circled";
  style?: CSSProperties;
  className?: string;
}

const icons: Record<string, ReactJSX.Element> = {
  "icon-right-open": <>&#xe800;</>,
  "icon-plus-circled": <>&#xe801;</>,
};

const Icon = ({ name, style, className = "" }: Props) => {
  return (
    <div className={className} style={style}>
      <i className={`icon ${name}`}>{icons[name as keyof typeof icons]}</i>
    </div>
  );
};

export default Icon;
