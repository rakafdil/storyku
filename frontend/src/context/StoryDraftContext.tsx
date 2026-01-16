import { createContext, useContext, useState } from "react";
import type { StoryDraft } from "@/types/story";

const initialDraft: StoryDraft = {
  title: "",
  writer: "",
  synopsis: "",
  imagePreviewUrl: "",
  category: "",
  tags: [],
  status: "",
  chapters: [],
};

const StoryDraftContext = createContext<{
  draft: StoryDraft;
  updateDraft: (data: Partial<StoryDraft>) => void;
  resetDraft: () => void;
} | null>(null);

export const StoryDraftProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [draft, setDraft] = useState<StoryDraft>(initialDraft);

  const updateDraft = (data: Partial<StoryDraft>) => {
    setDraft((prev) => ({ ...prev, ...data }));
  };

  const resetDraft = () => setDraft(initialDraft);

  return (
    <StoryDraftContext.Provider value={{ draft, updateDraft, resetDraft }}>
      {children}
    </StoryDraftContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStoryDraftContext = () => {
  const ctx = useContext(StoryDraftContext);
  if (!ctx) {
    throw new Error("useStoryDraftContext must be used inside provider");
  }
  return ctx;
};
