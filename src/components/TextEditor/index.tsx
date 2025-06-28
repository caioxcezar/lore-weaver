import {
  type Content,
  type UseEditorOptions,
  EditorContent,
  EditorContext,
  useEditor,
} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { HeadingDropdownMenu } from "./tiptap-ui/heading-dropdown-menu";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { ListDropdownMenu } from "./tiptap-ui/list-dropdown-menu";
import { UndoRedoButton } from "./tiptap-ui/undo-redo-button";
import { TextAlignButton } from "./tiptap-ui/text-align-button";
import { TextAlign } from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { MarkButton } from "./tiptap-ui/mark-button";
import { useRef } from "react";

interface Props {
  initialContent?: Content;
  onUpdate: (html: string) => void;
}

const TextEditor = ({ initialContent, onUpdate }: Props) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Superscript,
      Subscript,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  } as UseEditorOptions);

  return (
    <div className="text-editor flex flex-col flex-1">
      <EditorContext.Provider value={{ editor }}>
        <div
          className="tiptap-button-group bg-card rounded-xl shadow-xl p-1"
          data-orientation="horizontal"
        >
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
          <div className="mx-1 border-2" />
          <HeadingDropdownMenu
            levels={[1, 2, 3, 4]}
            className="text-editor-card"
          />
          <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
          <div className="mx-1 border-2" />
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
          <div className="mx-1 border-2" />
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="code" />
          <MarkButton type="underline" />
          <MarkButton type="superscript" />
          <MarkButton type="subscript" />
        </div>

        <div
          ref={editorRef}
          className="my-2 p-2 rounded-xl shadow-xl flex-1 overflow-y-auto bg-card"
        >
          <EditorContent
            ref={contentRef}
            editor={editor}
            style={{ height: (editorRef.current?.clientHeight || 0) - 50 }}
          />
        </div>
      </EditorContext.Provider>
    </div>
  );
};

export default TextEditor;
