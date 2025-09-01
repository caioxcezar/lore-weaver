"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const New = () => {
  const router = useRouter();
  const request = useRequest();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSave = async () => {
    try {
      if (!name.trim()) throw new Error("Provide a name for your world");
      await request.post("/api/worlds", { name, description });
      toast.success("World created~!");
      router.back();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onCancel = () => router.back();

  return (
    <Page title="World" subtitle="Create New World" className="m-2">
      <Input value={name} label="Name" onchange={setName} required />
      <Input
        value={description}
        label="Description"
        onchange={setDescription}
      />
      <div className="flex gap-2 mt-2">
        <Button
          text="Save"
          onClick={onSave}
          type="primary"
          className="flex-none"
        />
        <Button
          text="Cancel"
          onClick={onCancel}
          type="danger"
          className="flex-none"
        />
        <div className="grow" />
      </div>
    </Page>
  );
};

export default New;
