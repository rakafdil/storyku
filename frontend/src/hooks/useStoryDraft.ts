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
        { ...chapter, lastUpdated: new Date().toISOString() },
      ],
    });
  };

  const updateChapter = (
    index: number,
    chapter: { title: string; content: string }
  ) => {
    const updatedChapters = draft.chapters.map((ch, i) =>
      i === index
        ? { ...ch, ...chapter, lastUpdated: new Date().toISOString() }
        : ch
    );
    updateDraft({ chapters: updatedChapters });
  };

  return {
    draft,
    updateField,
    updateDraft,
    addChapter,
    updateChapter,
    resetDraft,
  };
};
