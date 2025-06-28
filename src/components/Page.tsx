import { type ReactNode } from "react";
import Icon from "./Icon";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const Page = ({ title, subtitle, children }: Props) => {
  return (
    <div className="p-2 h-screen flex flex-col">
      <div className="border-b-2 flex mb-2 items-baseline">
        <h1 className="text-5xl">{title}</h1>
        <Icon name="icon-right-open" className="text-4xl" />
        <h2 className="text-2xl">{subtitle}</h2>
      </div>
      <div className="page flex flex-col flex-1">{children}</div>
    </div>
  );
};

export default Page;
