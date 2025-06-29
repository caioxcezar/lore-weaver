"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { type World } from "@/types/world";
import { put } from "@/utils/request";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const Edit = () => {
  const router = useRouter();
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
      const response = await fetch(`/api/worlds/${id}`);
      const json = await response.json();
      const world: World = {
        ...json,
        created: new Date(json.created),
        lastEdit: json.lastEdit ? new Date(json.lastEdit) : null,
      };
      console.log(">>>", world.created.getFullYear());
      setWorld(world);
      setName(world.name);
      setDescription(world.description);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onSave = async () => {
    try {
      await put(`/api/worlds/${id}`, {
        ...world,
        name,
        description,
        lastEdit: new Date(),
      });
      toast.success("Updated");
    } catch (error: any) {
      let message = "";
      if (error.title) message = error.title;
      if (error.message) message = error.message;
      toast.error(message || "Unable to update the entry");
    }
  };
  const onDelete = () => {
    router.back();
  };

  return (
    <Page title="World" subtitle="Create New World" className="px-2">
      {world ? (
        <>
          <div className="my-2">
            created: {world.created.toLocaleDateString()}
          </div>
          <Input value={name} label="Name" onchange={setName} />
          <Input
            value={description}
            label="Description"
            onchange={setDescription}
          />
        </>
      ) : (
        <Skeleton count={5} className="my-2.5" />
      )}
      <div>
        <Button text="Save" onClick={onSave} type="success" />
        <Button text="Delete" onClick={onDelete} type="danger" />
      </div>
    </Page>
  );
};

export default Edit;
