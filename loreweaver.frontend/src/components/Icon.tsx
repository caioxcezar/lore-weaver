import type { JSX as ReactJSX } from "react/jsx-runtime";
import { type CSSProperties } from "react";

interface Props {
  name:
    | "icon-right-open"
    | "icon-plus-circled"
    | "icon-pencil-circled"
    | "icon-zoom-in"
    | "icon-zoom-out"
    | "icon-map"
    | "icon-users";
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

const icons: Record<string, ReactJSX.Element> = {
  "icon-right-open": <>&#xe800;</>,
  "icon-plus-circled": <>&#xe801;</>,
  "icon-pencil-circled": <>&#xe802;</>,
  "icon-zoom-in": <>&#xe803;</>,
  "icon-zoom-out": <>&#xe804;</>,
  "icon-map": <>&#xe805;</>,
  "icon-users": <>&#xe806;</>,
};

const Icon = ({ name, style, className = "", onClick = () => {} }: Props) => {
  return (
    <div className={className} style={style} onClick={onClick}>
      <i className={`icon ${name}`}>{icons[name as keyof typeof icons]}</i>
    </div>
  );
};

export default Icon;
