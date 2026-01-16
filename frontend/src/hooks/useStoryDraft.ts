import { useStoryDraftContext } from "@/context/StoryDraftContext";

export const useStoryDraft = () => {
  const { draft, updateDraft, resetDraft } = useStoryDraftContext();

  const updateField = (field: keyof typeof draft, value: string | string[]) => {
    updateDraft({ [field]: value });
  };

  const addChapter = (chapter: { title: string; content: string }) => {
    updateDraft({
      chapters: [
        ...draft.chapters,
        { ...chapter, updatedAt: new Date().toISOString() },
      ],
    });
  };

  return {
    draft,
    updateField,
    updateDraft,
    addChapter,
    resetDraft,
  };
};
