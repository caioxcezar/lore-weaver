"use client";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Page from "@/components/Page";
import Scrollable from "@/components/Scrollable";
import useRequest from "@/hooks/useRequest";
import { type World } from "@/types/world";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const request = useRequest();
  const [worlds, setWorlds] = useState<World[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(Number.MAX_SAFE_INTEGER);
  const [fetching, isFetching] = useState(true);

  const handleScroll = (position: number, height: number) => {
    if (fetching) return;
    if (position >= height / 2) loadWorlds(page + 1);
  };

  const loadWorlds = useCallback(
    async (page: number) => {
      try {
        if (page > total) return;
        isFetching(true);
        const json = await request.get(
          `/api/worlds?page=${page}&size=50`,
          true
        );
        setPage(page);
        setWorlds([...worlds, ...json.items]);
        setTotal(json.total);
      } catch (error) {
        toast.error((error as Error).message);
        setTotal(-1);
      } finally {
        isFetching(false);
      }
    },
    [total, worlds, request]
  );

  useEffect(() => {
    if (fetching) return;
    loadWorlds(page + 1);
  }, [page, fetching, loadWorlds]);

  return (
    <Page
      title="Lore Weaver"
      subtitle="Worlds"
      onMount={() => isFetching(false)}
    >
      <Scrollable onScroll={handleScroll}>
        <Card
          className="flex flex-col align-middle items-center justify-center cursor-pointer mb-4"
          onClick={() => router.push("/world/new")}
        >
          <div className="font-bold text-xl">Create New World</div>
          <Icon name="icon-plus-circled" className="text-5xl align-middle" />
        </Card>
        {worlds.map((item: World) => (
          <Card key={item.id} className="mb-4">
            <div
              className="flex flex-col cursor-pointer align-middle items-center justify-center grow"
              onClick={() => router.push(`/world?id=${item.id}`)}
            >
              <div className="font-bold text-xl">{item.name}</div>
              <div className="text-xl">{item.description}</div>
            </div>
            <div className="flex flex-col align-middle items-center justify-center">
              <Icon
                name="icon-pencil-circled"
                className="text-5xl align-middle cursor-pointer"
                onClick={() => router.push(`/world/edit?id=${item.id}`)}
              />
            </div>
          </Card>
        ))}
        {fetching && (
          <Card>
            <Skeleton className="text-xl" count={2} />
          </Card>
        )}
      </Scrollable>
    </Page>
  );
}
