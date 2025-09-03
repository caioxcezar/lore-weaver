"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Create = () => {
  const route = useRouter();
  const request = useRequest();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onCreate = async () => {
    try {
      await request.post("/api/login/create", {
        name,
        login,
        email,
        password,
      });
      toast.success(`User created~!`);
      route.push("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const onCancel = () => route.push("/login");

  return (
    <Page title="Login" subtitle="" className="m-2" authorize={false}>
      <Input value={name} label="Name" onChange={setName} />
      <Input
        value={login}
        label="Login"
        maxLength={20}
        onChange={(value) => setLogin(value.replace(/[^\w._-]/g, ""))}
      />
      <Input value={email} label="Email" onChange={setEmail} />
      <Input
        value={password}
        type="password"
        label="Password"
        onChange={setPassword}
      />
      <div className="flex gap-2 mt-2">
        <Button
          text="Save"
          onClick={onCreate}
          type="primary"
          className="flex-none"
        />
        <Button
          text="Cancel"
          onClick={onCancel}
          type="secundary"
          className="flex-none"
        />
        <div className="grow" />
      </div>
    </Page>
  );
};

export default Create;
