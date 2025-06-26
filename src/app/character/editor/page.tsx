"use client";
import Page from "@/components/Page";
import TextEditor from "@/components/TextEditor";

const Editor = () => {
  return (
    <Page title="Character" subtitle="Editor">
      <TextEditor content={"<p>Hello World! 🌎️</p>"} />
    </Page>
  );
};

export default Editor;
