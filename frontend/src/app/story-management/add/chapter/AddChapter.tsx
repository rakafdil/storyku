import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "@/components/story-management/TipTapToolbar";
import { useStoryDraft } from "@/hooks/useStoryDraft";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AddChapter = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Tulis ceritamu di sini...</p>",
    onUpdate: ({ editor }) => {
      setData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full rounded-b-md border border-t-0 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto",
      },
    },
  });

  const [searchParams] = useSearchParams();
  const editIndex = searchParams.get("edit");
  const { addChapter, draft } = useStoryDraft();
  const [data, setData] = useState<{ name: string; content: string }>({
    name: "",
    content: "",
  });

  useEffect(() => {
    if (editIndex !== null && draft.chapters[parseInt(editIndex)]) {
      const chapter = draft.chapters[parseInt(editIndex)];
      setData({ name: chapter.title, content: chapter.content });
      editor?.commands.setContent(chapter.content);
    }
  }, [editIndex, draft.chapters, editor]);

  return (
    <div className="min-h-screen overflow-y-auto p-8">
      <div className="grid grid-cols-1 gap-10">
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="title" className="font-bold">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Title"
            className="p-5"
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="grid w-full col-span-2 gap-3">
          <Label className="font-bold">Story</Label>

          <div className="flex flex-col">
            <Toolbar editor={editor} />

            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="col-span-2 flex justify-end mt-8 gap-3">
          <Link to={"/story/create"}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-3xl py-6 hover:scale-101 cursor-pointer border-gray-600"
              onClick={() => setData({ name: "", content: "" })}
            >
              Cancel
            </Button>
          </Link>
          <Link to={"/story/create"}>
            <Button
              size="lg"
              className="rounded-3xl py-6 hover:scale-101 cursor-pointer"
              onClick={() =>
                addChapter({ title: data.name, content: data.content })
              }
            >
              Save
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
