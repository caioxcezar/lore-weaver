import { type ReactNode } from "react";

interface Props {
    title: string,
    subtitle: string,
    children: ReactNode
}

const Page = ({ title, subtitle, children }: Props) => {
    return <div><h1>{title}</h1><h2>{subtitle}</h2><div className="page">{children}</div></div>;
}

export default Page;