import Input from "@/components/Input";
import Page from "@/components/Page";
import { useState } from "react";

const New = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const [climate, setClimate] = useState("");

  return (
    <Page title="Geo. Location" subtitle="Create new">
      <Input value={name} label="Name" onChange={setName} required />
      <Input
        value={description}
        label="Short Description"
        onChange={setDescription}
        required
      />
      <Input value={area} type="number" label="Area" onChange={setArea} />
      <Input
        value={population}
        type="number"
        label="Population"
        onChange={setName}
        required
      />
      <Input value={climate} label="Climate" onChange={setName} required />
      <Input value={name} label="Resources" onChange={setName} required />
      <Input value={name} label="ParentLocation" onChange={setName} required />
    </Page>
  );
};

export default New;
