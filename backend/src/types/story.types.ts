import { CATEGORY, STATUS, Tag } from "@prisma/client";

export interface Filter {
  category?: CATEGORY;
  status?: STATUS;
  search?: string;
  page: number | 1;
  limit: number | 10;
  start?: number;
  end?: number;
}

export interface CreateStoryChapterDTO {
  title: string;
  author: string;
  synopsis: string;
  category: CATEGORY;
  coverImage: string | null;
  status: STATUS;
  tags: Tag;
  chapter?: {
    title: string;
    content: string;
  };
}
