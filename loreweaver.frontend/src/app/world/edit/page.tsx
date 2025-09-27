"use client";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Label from "@/components/label";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { type World } from "@/types/world";
import { Image2Base64 } from "@/utils/Image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Edit = () => {
  const router = useRouter();
  const request = useRequest();

  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [map, setMap] = useState<string | null>(null);
  const [world, setWorld] = useState<World | null>(null);

  useEffect(() => {
    if (!id) return;
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const res = await request.get(`/api/worlds/${id}`, true);

      const world: World = {
        ...res,
        created: new Date(res.created),
        lastEdit: res.lastEdit ? new Date(res.lastEdit) : undefined,
      };

      setWorld(world);
      setName(world.name);
      setMap(world.map || null);
      setDescription(world.description);
    } catch (error) {
      toast.error((error as Error).message || "Unable to save the World");
    }
  };

  const onSave = async () => {
    try {
      await request.put(
        `/api/worlds/${id}`,
        {
          ...world,
          name,
          description,
          map,
        },
        true
      );
      toast.success("Updated~!");
      router.back();
    } catch (error: any) {
      toast.error((error as Error).message || "Unable to update the World");
    }
  };
  const onDelete = async () => {
    try {
      await request.del(`/api/worlds/${id}`, undefined, true);
      toast.success("Deleted~!");
      router.back();
    } catch (error: any) {
      toast.error((error as Error).message || "Unable to delete the World");
    }
  };

  const onCancel = () => router.back();

  return (
    <Page title="World" subtitle="Create New World" className="px-2">
      <>
        <Label
          value={`created: ${world?.created.toLocaleDateString()}`}
          loading={!world}
        />
        <Input loading={!world} value={name} label="Name" onChange={setName} />
        <Input
          loading={!world}
          value={description}
          label="Description"
          onChange={setDescription}
        />
        <InputFile
          loading={!world}
          label="World Map"
          onChange={async (files) =>
            setMap(files ? await Image2Base64(files[0]) : null)
          }
        />
      </>
      <div className="flex gap-2 my-2">
        <Button
          text="Save"
          onClick={onSave}
          type="primary"
          className="flex-none"
          disable={!world}
        />
        <Button
          text="Delete"
          onClick={onDelete}
          type="secundary"
          className="flex-none"
          disable={!world}
        />
        <Button
          text="Cancel"
          onClick={onCancel}
          type="danger"
          className="flex-none"
        />
        <div className="grow" />
      </div>
      <ImageViewer alt="Map of the world" src={map} />
    </Page>
  );
};

export default Edit;
