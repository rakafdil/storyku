import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  List,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-t-md p-2 flex flex-wrap gap-2 items-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={`p-2 rounded hover:bg-muted ${
          editor.isActive("bold") ? "bg-muted" : ""
        }`}
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={`p-2 rounded hover:bg-muted ${
          editor.isActive("italic") ? "bg-muted" : ""
        }`}
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        className={`p-2 rounded hover:bg-muted ${
          editor.isActive("underline") ? "bg-muted" : ""
        }`}
      >
        <Underline className="w-4 h-4" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        className={`p-2 rounded hover:bg-muted ${
          editor.isActive("strike") ? "bg-muted" : ""
        }`}
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-[1px] bg-border mx-1 h-6" />

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={`p-2 rounded hover:bg-muted ${
          editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""
        }`}
      >
        <Heading1 className="w-4 h-4" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`p-2 rounded hover:bg-muted ${
          editor.isActive("bulletList") ? "bg-muted" : ""
        }`}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toolbar;
