import { type ReactNode } from "react";
import Icon from "./Icon";

interface Props {
  title: string;
  subtitle: string;
  children?: ReactNode;
  className?: string;
}

const Page = ({ title, subtitle, children, className = "" }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="m-2 border-b-2 flex items-baseline">
        <h1 className="text-5xl">{title}</h1>
        <Icon name="icon-right-open" className="text-4xl" />
        <h2 className="text-2xl">{subtitle}</h2>
      </div>
      <div className={`page flex flex-col flex-1 ${className.trim()}`}>
        {children}
      </div>
    </div>
  );
};

export default Page;
