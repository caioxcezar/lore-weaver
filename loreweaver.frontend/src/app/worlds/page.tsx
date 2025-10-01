"use client";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Page from "@/components/Page";
import useRequest from "@/hooks/useRequest";
import { type World } from "@/types/world";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

const Worlds = () => {
  const router = useRouter();
  const request = useRequest();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [world, setWorld] = useState<World | null>(null);

  const onMount = async () => {
    if (!id) router.back();
    const json = await request.get(`/api/worlds/${id}`, true);
    setWorld({
      ...json,
      created: new Date(json.created),
      lastEdit: json.lastEdit ? new Date(json.lastEdit) : undefined,
    });
  };

  return (
    <Page title="World" subtitle={world?.name || ""} onMount={onMount}>
      <div className="flex">
        {world ? (
          <>
            <Card
              className="flex flex-row cursor-pointer"
              onClick={() => router.push(`/characters?world-id=${world.id}`)}
            >
              <div>
                <div className="font-bold text-xl">Characters</div>
                <div className="text-xl">
                  Create and edit characters from this world
                </div>
              </div>
              <div className="flex items-center">
                <Icon name="icon-users" className="text-5xl" />
              </div>
            </Card>
            <Card
              className="flex flex-row cursor-pointer"
              onClick={() => router.push(`/geoLocations?world-id=${world.id}`)}
            >
              <div>
                <div className="font-bold text-xl">Geo. Locations</div>
                <div className="text-xl">
                  Manage geographic locations like Oceans and Inslands
                </div>
              </div>
              <div className="flex items-center">
                <Icon name="icon-globe" className="text-5xl" />
              </div>
            </Card>
            <Card
              className="flex flex-row cursor-pointer"
              onClick={() => router.push(`/pollocations?world-id=${world.id}`)}
            >
              <div>
                <div className="font-bold text-xl">Pol. Locations</div>
                <div className="text-xl">
                  Manage political locations like Kingdoms and City State
                </div>
              </div>
              <div className="flex items-center">
                <Icon name="icon-map" className="text-5xl" />
              </div>
            </Card>
          </>
        ) : (
          <>
            {[1, 2, 3].map((id) => (
              <Card key={id} className="flex flex-row cursor-pointer">
                <div className="w-80">
                  <Skeleton className="text-xl mb-2 mt-1" />
                  <Skeleton className="text-xl" />
                </div>
                <div className="w-5" />
                <div className="w-15">
                  <Skeleton className="text-5xl mt-1" />
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </Page>
  );
};

export default Worlds;
