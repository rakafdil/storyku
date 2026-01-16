/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, User, Hash } from "lucide-react";
import type { TagRelation } from "../StoryManagement";
import DOMPurify from "dompurify";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ViewStory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const story = location.state?.story;

  if (!story) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold text-muted-foreground">
          Story data not found.
        </h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-5xl">
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
          <div className="md:col-span-1 h-full bg-muted/20 flex items-center justify-center p-6 border-r-0 md:border-r border-b md:border-b-0">
            <div className="relative aspect-[3/4] w-full max-w-[240px] shadow-lg rounded-md overflow-hidden">
              <img
                src={story.coverImage}
                alt={story.title}
                loading="lazy"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {story.title}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{story.author}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {story.tags?.length > 0 ? (
                  story.tags.map((t: TagRelation, idx: number) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      <Hash className="h-3 w-3 opacity-50" />
                      {t.tag.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground italic">
                    No tags
                  </span>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Synopsis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {story.synopsis || "No synopsis available for this story."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chapters</CardTitle>
          <CardDescription>
            Total {story.chapters?.length || 0} chapters available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-75">Chapter Title</TableHead>
                <TableHead>Preview Content</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {story.chapters?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No chapters added yet.
                  </TableCell>
                </TableRow>
              ) : (
                story.chapters.map((chapter: any, i: number) => (
                  <TableRow
                    key={i}
                    className="cursor-pointer"
                    onClick={() => {
                      scrollToSection(chapter.title);
                    }}
                  >
                    <TableCell className="font-medium">
                      <span className="line-clamp-1">{chapter.title}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span
                        className="line-clamp-1 max-w-lg"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(chapter.content),
                        }}
                      ></span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {story.chapters.map((chapter: any, i: number) => (
        <Card key={i} id={chapter.title}>
          <CardHeader>
            <CardTitle className="font-semibold text-lg flex items-center gap-2">
              {chapter.title}
            </CardTitle>
            <CardContent>
              <span
                className="w-full"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(chapter.content),
                }}
              ></span>
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ViewStory;
