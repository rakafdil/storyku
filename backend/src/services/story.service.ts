import { Filter } from "../types/story.types.js";
import prisma from "../lib/prisma.js";
import { Story } from "@prisma/client";
// import { put } from "@vercel/blob";

export class StoryService {
  private stories: Story[] = [];

  async findAll(filters: Filter): Promise<Story[]> {
    const where: any = {};

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { author: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const story = await prisma.story.findMany({
      where,
      skip: (filters?.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
        chapters: true,
      },
    });

    this.stories = story;
    return this.stories;
  }

  async findById(id: string): Promise<Story | undefined> {
    return this.stories.find((example) => example.id === id);
  }

  // async createStoryChapter(data: CreateStoryChapterDTO): Promise<{
  //   story: Story;
  //   chapter: Chapter;
  // }> {
  //   const newStory: CreateStoryChapterDTO = {
  //     id: Date.now().toString(),
  //     ...data,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   this.stories.push(newStory);
  //   return newStory;
  // }

  // async uploadIamge() {
  //   try {
  //     const file = req.file;
  //     const blob = await put(file.originalname, file.buffer, {
  //       access: "public",
  //       contentType: file.mimetype,
  //     });

  //     // `blob.url` is the publicly accessible URL of the stored image
  //     res.status(200).json({ url: blob.url });
  //   } catch (error) {
  //     console.error("Blob upload error:", error);
  //     res.status(500).json({ error: "Failed to upload image." });
  //   }
  // }

  // async update(id: string, data: UpdateStoryDto): Promise<Story | undefined> {
  //   const index = this.stories.findIndex((example) => example.id === id);
  //   if (index === -1) {
  //     return undefined;
  //   }
  //   this.stories[index] = {
  //     ...this.stories[index],
  //     ...data,
  //     updatedAt: new Date(),
  //   };
  //   return this.stories[index];
  // }

  async delete(id: string): Promise<boolean> {
    const index = this.stories.findIndex((example) => example.id === id);
    if (index === -1) {
      return false;
    }
    this.stories.splice(index, 1);
    return true;
  }
}
