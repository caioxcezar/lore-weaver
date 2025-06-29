"use client";
import Button from "@/components/Button";
import Page from "@/components/Page";
import TextEditor from "@/components/TextEditor";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Editor = () => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const onSave = () => router.back();
  const onCancel = () => router.back();
  return (
    <Page title="Character" subtitle="Editor">
      <TextEditor initialContent={content} onUpdate={setContent} />
      <div className="flex-col">
        <Button text="Save" type="success" onClick={onSave} />
        <Button text="Cancel" type="danger" onClick={onCancel} />
      </div>
    </Page>
  );
};

export default Editor;
