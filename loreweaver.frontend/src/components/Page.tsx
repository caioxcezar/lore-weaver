import { useEffect, type ReactNode } from "react";
import Icon from "./Icon";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";

interface Props {
  title: string;
  subtitle: string;
  children?: ReactNode;
  className?: string;
  authorize?: boolean;
  onMount?: () => void;
}

const Page = ({
  title,
  subtitle,
  children,
  className = "",
  authorize = true,
  onMount = () => {},
}: Props) => {
  const route = useRouter();

  useEffect(() => {
    if (authorize) {
      const res = localStorage.getItem("token");
      if (!res) return route.push("login");

      const token = JSON.parse(res);
      const date = DateTime.fromMillis(Number(token.expiration));
      if (date.diffNow().milliseconds < 0) return route.push("login");
    }
    onMount();
  }, [authorize, route]);

  return (
    <div className="h-screen flex flex-col">
      <div className="m-2 border-b-2 flex items-baseline">
        <h1 className="text-5xl">{title}</h1>
        {!!subtitle && (
          <>
            <Icon name="icon-right-open" className="text-4xl" />
            <h2 className="text-2xl">{subtitle}</h2>
          </>
        )}
      </div>
      <div className={`page flex flex-col flex-1 ${className.trim()}`}>
        {children}
      </div>
    </div>
  );
};

export default Page;
