import { type Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  content: Content;
}

const TextEditor = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};

export default TextEditor;
