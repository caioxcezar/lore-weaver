"use client";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { type World } from "@/types/world";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const World = () => {
  const request = useRequest();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || null;

  const [world, setWorld] = useState<World | null>(null);

  const onMount = async () => {
    const json = await request.get(`/api/worlds/${id}`, true);
    setWorld(json);
  };

  return (
    <Page
      title="World"
      subtitle={world?.name || ""}
      onMount={onMount}
      authorize
    >
      To be done
    </Page>
  );
};

export default World;
