/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, Hash, ChevronRight } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Dashboard = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/stories?limit=50`);
        setStories(response.data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="w-full text-white bg-red-500 rounded-md p-6">{error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-5xl font-bold mb-2">Hello, Welcome to StoryKu!</h1>
        <p className="text-muted-foreground text-lg">
          Discover {stories.length} amazing stories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse pt-0">
                <div className="h-64 bg-gray-300" />
                <CardContent className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </CardContent>
              </Card>
            ))
          : stories.map((story, i) => (
              <Card
                key={story.id || i}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group pt-0"
                onClick={() => {
                  navigate(`/story/${story.id}`, {
                    state: { story },
                  });
                }}
              >
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <Badge
                    className="absolute top-3 right-3"
                    variant={
                      story.status === "PUBLISH" ? "default" : "secondary"
                    }
                  >
                    {story.status}
                  </Badge>
                </div>

                <CardContent className="pt-0 space-y-4 min-h-62.5 flex flex-col">
                  <div>
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{story.author}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 grow">
                    {story.synopsis || "No synopsis available"}
                  </p>

                  {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 line-clamp-2">
                      {story.tags.slice(0, 3).map((t: any, idx: number) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs flex items-center gap-1 whitespace-nowrap"
                        >
                          <Hash className="h-3 w-3" />
                          {t.tag.name}
                        </Badge>
                      ))}
                      {story.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs whitespace-nowrap"
                        >
                          +{story.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm pt-2 border-t">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-medium text-muted-foreground">
                      {story.chapters?.length || 0} chapters
                    </span>
                  </div>

                  <Button
                    className="w-full group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/story/${story.id}`, {
                        state: { story },
                      });
                    }}
                  >
                    Read Story
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
      </div>

      {!loading && stories.length === 0 && (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
            <p className="text-muted-foreground mb-4">
              Start creating your first story today!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
