"use client";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Page from "@/components/Page";
import { World } from "@/types/world";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [worlds, setWorlds] = useState<World[]>([]);
  return (
    <Page title="Lore Weaver" subtitle="Worlds">
      <div className="flex">
        <Card
          className="flex flex-col align-middle items-center justify-center cursor-pointer"
          onClick={() => router.push("/character")}
        >
          <div>Create New World</div>
          <Icon name="icon-plus-circled" className="text-5xl align-middle" />
        </Card>
      </div>
    </Page>
  );
}
