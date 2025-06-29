"use client";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Page from "@/components/Page";
import Scrollable from "@/components/Scrollable";
import { type World } from "@/types/world";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [worlds, setWorlds] = useState<World[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(Number.MAX_SAFE_INTEGER);
  const [fetching, isFetching] = useState(false);

  useEffect(() => {
    if (fetching) return;
    loadWorlds(page + 1);
  }, [fetching]);

  const handleScroll = (position: number, height: number) => {
    if (fetching) return;
    if (position >= height / 2) loadWorlds(page + 1);
  };

  const loadWorlds = async (page: number) => {
    try {
      if (page > total) return;
      isFetching(true);
      const response = await fetch(`/api/worlds?page=${page}&size=50`);
      const json = await response.json();
      setPage(page);
      if (!json.items.length) return;
      setWorlds((prev) => [...prev, ...json.items]);
      setTotal(json.total);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      isFetching(false);
    }
  };

  return (
    <Page title="Lore Weaver" subtitle="Worlds">
      <Scrollable onScroll={handleScroll}>
        <Card
          className="flex flex-col align-middle items-center justify-center cursor-pointer mb-4"
          onClick={() => router.push("/world/new")}
        >
          <div className="font-bold text-xl">Create New World</div>
          <Icon name="icon-plus-circled" className="text-5xl align-middle" />
        </Card>
        {worlds.map((item: World) => (
          <Card
            key={item.id}
            className="flex flex-col align-middle items-center justify-center cursor-pointer mb-4"
            onClick={() => router.push(`/world/edit?id=${item.id}`)}
          >
            <div className="font-bold text-xl">{item.name}</div>
            <div className="text-xl">{item.description}</div>
          </Card>
        ))}
        {fetching && (
          <Card>
            <Skeleton count={2} />
          </Card>
        )}
      </Scrollable>
    </Page>
  );
}
