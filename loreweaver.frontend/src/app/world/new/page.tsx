"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { useRouter } from "next/navigation";
import { useState } from "react";

const New = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSave = () => {};
  const onCancel = () => router.back();
  return (
    <Page title="World" subtitle="Create New World">
      <Input value={name} label="Name" onchange={setName} />
      <Input
        value={description}
        label="Description"
        onchange={setDescription}
      />
      <div>
        <Button text="Save" onClick={onSave} type="success" />
        <Button text="Cancel" onClick={onCancel} type="danger" />
      </div>
    </Page>
  );
};

export default New;
