"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { Image2Base64 } from "@/utils/Image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const New = () => {
  const router = useRouter();
  const request = useRequest();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [map, setMap] = useState<File | null>(null);

  const onSave = async () => {
    try {
      if (!name.trim()) throw new Error("Provide a name for your world");
      await request.post("/api/worlds", {
        name,
        description,
        map: map ? await Image2Base64(map) : null,
      });
      toast.success("World created~!");
      router.back();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onCancel = () => router.back();

  return (
    <Page title="World" subtitle="Create New World" className="m-2">
      <Input value={name} label="Name" onChange={setName} required />
      <Input
        value={description}
        label="Description"
        onChange={setDescription}
      />
      <InputFile
        label="World Map"
        onChange={(files) => setMap(files ? files[0] : null)}
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
