import {
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

const Card = ({ children, className, onClick, style }: Props) => {
  return (
    <div
      className={`bg-card rounded-xl m-2 p-2 shadow-xl ${className?.trim()}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
