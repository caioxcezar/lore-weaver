"use client";
import Input from "@/components/Input";
import MultiSelect from "@/components/MultiSelect";
import Page from "@/components/Page";
import Select from "@/components/Select";
import { useState } from "react";

const Sandbox = () => {
  const [value, setValue] = useState<{ key: number; title: string }[]>([]);
  const [value1, setValue1] = useState<{ key: number; title: string } | null>(
    null
  );
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const values = [
    { key: 1, title: "a value" },
    { key: 2, title: "another value" },
    { key: 3, title: "third value" },
  ];

  return (
    <Page title="sandbox" authorize={false}>
      <Input label="label 1" value={input1} onChange={setInput1} />
      <MultiSelect
        label="multi select"
        value={value}
        onChange={setValue}
        values={values}
      />
      <Select
        label="select"
        value={value1}
        onChange={setValue1}
        values={values}
      />
      <Input label="label 2" value={input2} onChange={setInput2} />
    </Page>
  );
};

export default Sandbox;
