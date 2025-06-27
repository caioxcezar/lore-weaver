import { type Content, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  content: Content;
}

const TextEditor = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Superscript,
      Subscript,
      Link.configure({ openOnClick: false }),
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error: Error) => console.error("Upload failed:", error),
      }),
    ],
    content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="tiptap-button-group" data-orientation="horizontal">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
        <div className="ml-1 mr-1 border-2" />
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
        <div className="ml-1 mr-1 border-2" />
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <div className="ml-1 mr-1 border-2" />
        <LinkPopover />
        <div className="ml-1 mr-1 border-2" />
        <ImageUploadButton text="Add" />
      </div>

      <EditorContent editor={editor} />
    </EditorContext.Provider>
  );
};

export default TextEditor;
