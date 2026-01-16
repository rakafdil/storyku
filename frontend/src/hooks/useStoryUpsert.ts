/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios, { AxiosError } from "axios";

interface StoryPayload {
  title: string;
  writer: string;
  synopsis: string;
  category: string;
  tags: string[];
  status: string;
  coverImage?: File;
  chapters?: {
    title: string;
    content: string;
    updatedAt?: string;
  }[];
}

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export const useStoryUpsert = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const createStory = async (payload: StoryPayload): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("author", payload.writer);
      formData.append("synopsis", payload.synopsis);
      formData.append(
        "category",
        payload.category.toUpperCase() ?? "FINANCIAL"
      );
      formData.append("status", payload.status.toUpperCase() ?? "DRAFT");

      if (payload.tags && Array.isArray(payload.tags)) {
        payload.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      }

      if (payload.chapters && Array.isArray(payload.chapters)) {
        payload.chapters.forEach((item, index) => {
          formData.append(`chapter[${index}][title]`, item.title);
          formData.append(`chapter[${index}][content]`, item.content);
        });
      }

      if (payload.coverImage) {
        formData.append("coverImage", payload.coverImage);
      }

      const response = await axios.post<ApiResponse>(
        `${API_BASE_URL}/stories`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || err.message
          : "Failed to create story";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStory = async (
    storyId: string,
    payload: StoryPayload
  ): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("author", payload.writer);
      formData.append("synopsis", payload.synopsis);
      formData.append(
        "category",
        payload.category.toUpperCase() ?? "FINANCIAL"
      );
      formData.append("status", payload.status.toUpperCase() ?? "DRAFT");

      if (payload.tags && Array.isArray(payload.tags)) {
        payload.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      }

      if (payload.chapters && Array.isArray(payload.chapters)) {
        payload.chapters.forEach((item, index) => {
          formData.append(`chapter[${index}][title]`, item.title);
          formData.append(`chapter[${index}][content]`, item.content);
        });
      }

      if (payload.coverImage) {
        formData.append("coverImage", payload.coverImage);
      }

      const response = await axios.put<ApiResponse>(
        `${API_BASE_URL}/stories/${storyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || err.message
          : "Failed to update story";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createStory,
    updateStory,
    isLoading,
    error,
  };
};
