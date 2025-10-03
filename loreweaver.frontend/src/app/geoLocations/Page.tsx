"use client";
import Page from "@/components/Page";
import Scrollable from "@/components/Scrollable";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { type Location } from "@/types/location";
import Card from "@/components/Card";
import useRequest from "@/hooks/useRequest";
import { toast } from "react-toastify";
import Icon from "@/components/Icon";
import Skeleton from "react-loading-skeleton";

const GeoLocations = () => {
  const router = useRouter();
  const request = useRequest();
  const searchParams = useSearchParams();

  const worldId = searchParams?.get("world-id") || null;

  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(Number.MAX_SAFE_INTEGER);
  const [fetching, isFetching] = useState(true);

  const handleScroll = (position: number, height: number) => {
    if (fetching) return;
    if (position >= height / 2) loadLocations(page + 1);
  };

  const loadLocations = async (page: number) => {
    try {
      if (page > total) return;
      isFetching(true);
      const url = `/api/geoLocations?worldId=${worldId}&page=${page}&size=50`;
      const json = await request.get(url, true);
      setPage(page);
      setLocations([...locations, ...json.items]);
      setTotal(json.total);
    } catch (error) {
      toast.error((error as Error).message);
      setTotal(-1);
    } finally {
      isFetching(false);
    }
  };

  const onMount = () => {
    if (!worldId) router.back();
    loadLocations(page + 1);
  };

  return (
    <Page title="Locations" onMount={onMount}>
      <Scrollable onScroll={handleScroll}>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          <Card
            className="flex flex-row cursor-pointer"
            onClick={() => router.push(`/geoLocations/new?world-id=${worldId}`)}
          >
            <div>
              <div className="font-bold text-xl">Create New Location</div>
              <div className="text-xl">Write a new location</div>
            </div>
            <div className="flex flex-1 items-center">
              <div className="flex-1" />
              <Icon
                name="icon-plus-circled"
                className="text-5xl align-middle"
              />
            </div>
          </Card>
          {locations.map((item: Location) => (
            <Card key={item.id} className="flex flex-row">
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/geoLocations/edit?id=${item.id}`)}
              >
                <div className="font-bold text-xl">{item.name}</div>
                <div className="text-xl">{item.shortDescription}</div>
              </div>

              <div className="flex flex-1 items-center">
                <div className="flex-1" />
                <Icon
                  name="icon-pencil-circled"
                  className="text-5xl align-middle cursor-pointer"
                  onClick={() => router.push(`/worlds/edit?id=${item.id}`)}
                />
              </div>
            </Card>
          ))}
          {fetching && (
            <Card className="flex flex-row">
              <div className="w-80">
                <Skeleton className="text-xl mb-2 mt-1" />
                <Skeleton className="text-xl" />
              </div>
              <div className="w-5" />
              <div className="w-15">
                <Skeleton className="text-5xl mt-1 mx-2" />
              </div>
            </Card>
          )}
        </div>
      </Scrollable>
    </Page>
  );
};

export default GeoLocations;
