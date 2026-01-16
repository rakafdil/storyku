import { FilterUI } from "@/components/story-management/FilterUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ActionButton from "@/components/common/ActionButton";

export interface TagRelation {
  storyId: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
}

const StoryManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stories, setStories] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastFetchParamsRef = useRef<string>("");
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleDelete = useCallback(async (id: string) => {
    if (loading) return;
    try {
      setLoading(true);

      const url = `${API_BASE_URL}/stories/${id}`;

      await axios.delete(url);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentParams = searchParams.toString();
    if (lastFetchParamsRef.current === currentParams && stories.length > 0) {
      return;
    }
    lastFetchParamsRef.current = currentParams;

    const fetchData = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const params = new URLSearchParams();

        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const status = searchParams.get("status");

        if (search) params.set("search", search);
        if (category) params.set("category", category);
        if (status) params.set("status", status);

        const queryString = params.toString();
        const url = `${API_BASE_URL}/stories${
          queryString ? `?${queryString}` : ""
        }`;

        const response = await axios.get(url);
        const data = response.data.data;
        setStories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams, stories.length]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== searchValue) {
      setSearchValue(currentSearch);
    }
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-col gap-18">
      <div className="flex justify-between items-center gap-10">
        <div className="flex relative justify-center items-center w-full">
          <InputGroup>
            <Input
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              type="search"
              placeholder="Search by title or author name..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <InputGroupAddon align="inline-end">
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex gap-4 items-center">
          <FilterUI
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <div className="border self-stretch mx-2" />
          <Link to={"/story/create"}>
            <Button
              size="lg"
              className="rounded-3xl cursor-pointer hover:scale-101 py-6"
            >
              <Plus />
              Add Story
            </Button>
          </Link>
        </div>
      </div>
      {error && (
        <div className="w-full text-white bg-red-500 rounded-md p-6">
          {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            <tr className="text-left text-sm text-muted-foreground">
              <th className="px-6 py-4 font-medium">No</th>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Writer</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Keyword</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-t">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <td key={i} className="px-6 py-4">
                        <div className="h-4 animate-pulse bg-gray-300 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : stories.map((s, i) => (
                  <tr
                    key={s.id || i}
                    className="border-t hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{i + 1}</td>
                    <td className="px-6 py-4 font-medium">
                      <p
                        className="max-w-[220px] truncate hover:underline cursor-pointer"
                        onClick={() => {
                          navigate(`/story/${s.id}`, {
                            state: { story: s },
                          });
                        }}
                      >
                        {s.title}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm">{s.author}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                        {s.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {s.tags?.map((t: TagRelation, idx: number) => (
                          <span
                            key={idx}
                            className="rounded-full px-3 py-1 text-xs bg-amber-100 text-amber-800 font-medium"
                          >
                            {t.tag.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          s.status === "PUBLISH"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionButton
                        onView={() => {
                          navigate(`/story/${s.id}`, {
                            state: { story: s },
                          });
                        }}
                        onDelete={() => {
                          handleDelete(s.id);
                        }}
                        onUpdate={() => {
                          navigate(`/story/edit/${s.id}`, {
                            state: { story: s },
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoryManagement;
