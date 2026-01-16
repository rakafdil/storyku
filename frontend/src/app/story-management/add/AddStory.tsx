import ActionButton from "@/components/common/ActionButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStoryDraft } from "@/hooks/useStoryDraft";
import { useStoryUpsert } from "@/hooks/useStoryUpsert";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddStory = () => {
  const { draft, updateField, updateDraft } = useStoryDraft();
  const { createStory, isLoading: isSaving } = useStoryUpsert();
  const navigate = useNavigate();
  const [isLoading] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const handleSaveStory = async () => {
    if (!draft.title || draft.title.trim() === "") {
      alert("Please fill in Title");
      return;
    }

    if (!draft.writer || draft.writer.trim() === "") {
      alert("Please fill in Writer Name");
      return;
    }

    if (!draft.synopsis || draft.synopsis.trim() === "") {
      alert("Please fill in Synopsis");
      return;
    }

    if (!draft.category) {
      alert("Please select a Category");
      return;
    }

    if (!draft.status) {
      alert("Please select a Status");
      return;
    }

    if (!draft.tags || draft.tags.length === 0) {
      alert("Please add at least one Tag");
      return;
    }

    if (!draft.chapters || draft.chapters.length === 0) {
      alert("Please add at least one Chapter");
      return;
    }

    try {
      const response = await createStory({
        title: draft.title,
        writer: draft.writer,
        synopsis: draft.synopsis,
        category: draft.category,
        tags: Array.isArray(draft.tags) ? draft.tags : [],
        status: draft.status,
        coverImage: coverImageFile || undefined,
        chapters: draft.chapters || undefined,
      });

      if (response.success) {
        alert("Story created successfully!");
        navigate("/story");
      }
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Failed to create story");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    updateField("imagePreviewUrl", previewUrl);
  };

  return (
    <div className="min-h-screen overflow-y-auto p-8">
      <div className="grid grid-cols-2 gap-10" aria-disabled={isSaving}>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="picture">Title</Label>
          <Input
            id="text"
            placeholder="Title"
            className="p-5"
            value={draft.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="picture">Writer Name</Label>
          <Input
            id="text"
            placeholder="Writer Name"
            className="p-5"
            value={draft.writer}
            onChange={(e) => updateField("writer", e.target.value)}
          />
        </div>

        <div className="grid w-full col-span-2 gap-3">
          <Label>Synopsis</Label>
          <Textarea
            placeholder="Synopsis"
            className="min-h-[120px] resize-none p-5"
            value={draft.synopsis}
            onChange={(e) => updateField("synopsis", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className="border p-2 rounded-md"
            value={draft.category}
            onChange={(e) => updateField("category", e.target.value)}
          >
            <option value="financial">Financial</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
          </select>
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="tags">Tags/Keyword Story</Label>
          <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[44px] items-center">
            {draft.tags &&
              Array.isArray(draft.tags) &&
              draft.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full px-3 py-1 text-xs bg-amber-100 text-amber-800 font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = draft.tags.filter((_, i) => i !== index);
                      updateField("tags", newTags);
                    }}
                    className="cursor-pointer hover:text-amber-900"
                  >
                    ✕
                  </button>
                </span>
              ))}
            <input
              type="text"
              placeholder="Add tags..."
              className="flex-1 outline-none min-w-[100px] bg-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  const newTag = e.currentTarget.value.trim();
                  if (newTag) {
                    const updatedTags = Array.isArray(draft.tags)
                      ? [...draft.tags, newTag]
                      : [newTag];
                    updateField("tags", updatedTags);
                    e.currentTarget.value = "";
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
          {draft.imagePreviewUrl && (
            <img
              src={draft.imagePreviewUrl}
              alt="Preview"
              className="max-w-[200px] max-h-[200px] rounded"
            />
          )}
        </div>

        <div className="flex flex-col gap-2 items-start w-full">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="border p-2 rounded-md w-full"
            value={draft.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        <div className="col-span-2 flex justify-end mt-8">
          <Link to={"/story/create/chapter"}>
            <Button
              size="lg"
              className="rounded-3xl py-6 hover:scale-101 cursor-pointer"
            >
              <Plus />
              Add Chapter
            </Button>
          </Link>
        </div>

        <table className="w-full border-collapse col-span-2">
          <thead className="bg-muted/50">
            <tr className="text-left text-sm text-muted-foreground">
              <th className="px-6 py-4 font-medium w-1/2">Title</th>
              <th className="px-6 py-4 font-medium w-3/10">Last Updated</th>
              <th className="px-6 py-4 font-medium text-right w-1/5">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <tr key={index} className="border-t">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <td key={i} className="px-6 py-4">
                      <div className="h-4 animate-pulse bg-gray-300 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : draft.chapters.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Add your chapter by clicking the add button
                </td>
              </tr>
            ) : (
              draft.chapters.map((s, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">
                    <p className="max-w-[200px] truncate">{s.title}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <p className="max-w-[200px] truncate">{s.updatedAt}</p>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <ActionButton
                      onDelete={() => {
                        const updatedChapters = draft.chapters.filter(
                          (_, idx) => idx !== i
                        );
                        updateDraft({
                          chapters: updatedChapters,
                        });
                      }}
                      onUpdate={() => {
                        navigate(`/story/create/chapter?edit=${i}`);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="col-span-2 flex justify-end mt-8 gap-3">
          <Link to={"/story"}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-3xl py-6 hover:scale-101 cursor-pointer border-gray-600"
            >
              Cancel
            </Button>
          </Link>
          <Button
            size="lg"
            className="rounded-3xl py-6 hover:scale-101 cursor-pointer"
            onClick={handleSaveStory}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddStory;
