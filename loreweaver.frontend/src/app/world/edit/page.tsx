"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/label";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { type World } from "@/types/world";
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
  const [world, setWorld] = useState<World | null>(null);

  useEffect(() => {
    if (!id) return;
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const res = (await request.get<World>(`/api/worlds/${id}`))!;

      const world: World = {
        ...res,
        created: new Date(res.created),
        lastEdit: res.lastEdit ? new Date(res.lastEdit) : undefined,
      };

      setWorld(world);
      setName(world.name);
      setDescription(world.description);
    } catch (error) {
      toast.error((error as Error).message || "Unable to save the World");
    }
  };

  const onSave = async () => {
    try {
      await request.put(`/api/worlds/${id}`, {
        ...world,
        name,
        description,
      });
      toast.success("Updated~!");
      router.back();
    } catch (error: any) {
      toast.error((error as Error).message || "Unable to update the World");
    }
  };
  const onDelete = async () => {
    try {
      await request.del(`/api/worlds/${id}`);
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
        <Input loading={!world} value={name} label="Name" onchange={setName} />
        <Input
          loading={!world}
          value={description}
          label="Description"
          onchange={setDescription}
        />
      </>
      <div className="flex gap-2 mt-2">
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
    </Page>
  );
};

export default Edit;
