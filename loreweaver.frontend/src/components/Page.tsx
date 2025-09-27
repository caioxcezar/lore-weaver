import { useEffect, useState, type ReactNode } from "react";
import Icon from "./Icon";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import { parseJwt } from "@/utils/jwt";
import Button from "./Button";

interface Props {
  title: string;
  subtitle?: string;
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

  const [name, setName] = useState("");

  useEffect(() => {
    if (authorize) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return goToLogin();

        const { exp, unique_name } = parseJwt(token);
        const date = DateTime.fromMillis(Number(exp) * 1000);
        if (date.diffNow().milliseconds < 0) return goToLogin();
        setName(unique_name);
      } catch (_error) {
        localStorage.removeItem("token");
        goToLogin();
      }
    }
    onMount();
  }, [authorize, route]);

  const goToLogin = () => {
    setName("");
    route.push("/login");
    localStorage.removeItem("token");
  };

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
        {!!name && (
          <div className="grow flex gap-2">
            <div className="grow" />
            <div className="flex items-center">
              <div className="text-2xl">{name}</div>
            </div>
            <Button text="logout" type="primary" onClick={goToLogin} />
          </div>
        )}
      </div>
      <div className={`page flex flex-col flex-1 ${className.trim()}`}>
        {children}
      </div>
    </div>
  );
};

export default Page;
