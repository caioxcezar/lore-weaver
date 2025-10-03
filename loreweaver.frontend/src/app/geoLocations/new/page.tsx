"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputArray from "@/components/InputArray";
import Page from "@/components/Page";
import Select from "@/components/Select";
import useRequest from "@/hooks/useRequest";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface SelectProp {
  key: number;
  title: string;
}

const geoTypes = [
  { key: 0, title: "Planet" },
  { key: 1, title: "Continent" },
  { key: 2, title: "Ocean" },
  { key: 3, title: "Island" },
  { key: 4, title: "Archipelago" },
  { key: 5, title: "Peninsula" },
  { key: 6, title: "Isthmus" },
  { key: 7, title: "Desert" },
  { key: 8, title: "Forest" },
  { key: 9, title: "Mountain" },
  { key: 10, title: "Plain" },
  { key: 11, title: "Valley" },
  { key: 12, title: "Swamp" },
  { key: 13, title: "Tundra" },
  { key: 14, title: "Glacier" },
  { key: 15, title: "River" },
  { key: 16, title: "Lake" },
];

const New = () => {
  const request = useRequest();
  const router = useRouter();
  const searchParams = useSearchParams();

  const worldId = searchParams?.get("world-id") || null;

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [shortDescription, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const [climate, setClimate] = useState("");
  const [resources, setResources] = useState<string[]>([]);
  const [type, setType] = useState<SelectProp | null>(null);
  const [parent, setParent] = useState<SelectProp | null>(null);
  const [parents, setParents] = useState<SelectProp[]>([]);

  const onMount = async () => {
    if (!worldId) router.back();
    fetchLocations([], 1);
  };

  const fetchLocations = async (items: any[], page: number, total?: number) => {
    if (total != undefined && page * 50 >= total) {
      setParents(items);
      setLoading(false);
      return;
    }
    const url = `/api/geoLocations?worldId=${worldId}&page=${page}&size=50`;
    const json = await request.get(url, true);
    fetchLocations(items.concat(json.items), page + 1, json.total);
  };

  const onSave = async () => {
    try {
      const obj = {
        name,
        shortDescription,
        geographicType: type?.key,
        worldId,
        area,
        population,
        climate,
        resources,
        parentLocation: parent?.key,
      };

      await request.post("/api/geoLocations", obj, true);
      toast.success("Location created~!");
      router.back();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <Page
      title="Geo. Location"
      subtitle="Create new"
      className="p-2"
      onMount={onMount}
    >
      <Select
        label="Select type"
        onChange={setType}
        value={type}
        values={geoTypes}
      />
      <Input value={name} label="Name" onChange={setName} required />
      <Input
        value={shortDescription}
        label="Short Description"
        onChange={setDescription}
        required
      />
      <Input value={area} type="float" label="Area (km²)" onChange={setArea} />
      <Input
        value={population}
        type="integer"
        label="Population"
        onChange={setPopulation}
        required
      />
      <Input value={climate} label="Climate" onChange={setClimate} required />
      <InputArray
        values={resources}
        label="Resources"
        onChange={setResources}
        required
      />
      <Select
        value={parent}
        values={parents}
        label="Parent Location"
        onChange={setParent}
        loading={loading}
      />
      <div className="flex gap-2 my-2">
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
