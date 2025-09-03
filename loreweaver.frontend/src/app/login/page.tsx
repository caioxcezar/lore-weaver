"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const route = useRouter();
  const request = useRequest();

  const [login, setLogin] = useState("");
  const [password, setPass] = useState("");

  const onLogin = async () => {
    try {
      const res = await request.post<{ token: string }>("/api/login/", {
        login,
        password,
      });

      if (!res) throw new Error("Unable to get token");
      localStorage.setItem(
        "token",
        JSON.stringify({
          value: `Bearer ${res.token}`,
          expiration: DateTime.now().plus({ days: 1 }).toMillis().toString(),
        })
      );
      route.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onCreate = () => route.push("/login/create");

  return (
    <Page title="Login" subtitle="" className="m-2" authorize={false}>
      <Input value={login} label="Login" onChange={setLogin} maxLength={20} />
      <Input
        value={password}
        type="password"
        label="Password"
        onChange={setPass}
      />
      <div className="flex gap-2 mt-2">
        <Button
          text="Login"
          onClick={onLogin}
          type="primary"
          className="flex-none"
        />
        <Button
          text="Create new account"
          onClick={onCreate}
          type="secundary"
          className="flex-none"
        />
        <div className="grow" />
      </div>
    </Page>
  );
};

export default Login;
