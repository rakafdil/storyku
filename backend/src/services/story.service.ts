import { Filter, UpsertStoryChapterDTO } from "../types/story.types.js";
import prisma from "../lib/prisma.js";
import { Story } from "@prisma/client";
import { del, put } from "@vercel/blob";

export class StoryService {
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
        tags: {
          include: {
            tag: true,
          },
        },
        chapters: true,
      },
    });

    return story;
  }

  async findById(id: string) {
    return prisma.story.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        chapters: true,
      },
    });
  }

  async createStoryChapter(
    data: UpsertStoryChapterDTO,
    file?: Express.Multer.File
  ): Promise<Story> {
    let coverImgURL = null;

    if (file) {
      const blob = await put(file.originalname, file.buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      coverImgURL = blob.url;
    }

    const story = await prisma.story.create({
      data: {
        title: data.title,
        author: data.author,
        synopsis: data.synopsis,
        category: data.category,
        status: data.status,
        coverImage: coverImgURL,

        tags: {
          create: data.tags.map((t) => ({
            tag: {
              connectOrCreate: {
                where: { name: t.toLowerCase() },
                create: { name: t.toLowerCase() },
              },
            },
          })),
        },

        chapters:
          data.chapter && data.chapter.length > 0
            ? {
                create: data.chapter?.map((c) => ({
                  title: c.title,
                  content: c.content,
                })),
              }
            : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        chapters: true,
      },
    });

    return story;
  }

  async updateStoryChapter(
    storyId: string,
    data: UpsertStoryChapterDTO,
    file?: Express.Multer.File
  ): Promise<Story> {
    let newCoverUrl;

    if (file) {
      const blob = await put(file.originalname, file.buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      newCoverUrl = blob.url;

      const blobOld = await prisma.story.findUnique({
        where: { id: storyId },
        select: { coverImage: true },
      });

      if (blobOld?.coverImage) await del(blobOld.coverImage);
    }

    const story = await prisma.story.update({
      where: { id: storyId },
      data: {
        title: data.title,
        author: data.author,
        synopsis: data.synopsis,
        category: data.category,
        status: data.status,
        coverImage: newCoverUrl,

        tags: {
          deleteMany: {},
          create: data.tags.map((t) => ({
            tag: {
              connectOrCreate: {
                where: { name: t.toLowerCase() },
                create: { name: t.toLowerCase() },
              },
            },
          })),
        },

        chapters: {
          deleteMany: {},
          create: data.chapter?.map((c) => ({
            title: c.title,
            content: c.content,
          })),
        },
      },
    });

    return story;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.story.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
