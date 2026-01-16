export interface StoryDraft {
  title: string;
  writer: string;
  synopsis: string;
  category: "financial" | "technology" | "health" | "";
  tags: string[];
  status: "publish" | "draft" | "";
  imagePreviewUrl: string;
  chapters: {
    title: string;
    content: string;
    lastUpdated?: string;
  }[];
}
