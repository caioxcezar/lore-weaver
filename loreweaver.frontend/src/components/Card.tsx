import {
  type Ref,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

const Card = ({ children, className, onClick, style, ref }: Props) => {
  return (
    <div
      ref={ref}
      className={`bg-card rounded-xl m-2 p-2 shadow-xl ${className?.trim()}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
