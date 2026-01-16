import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";

interface FilterUIProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export function FilterUI({ searchParams, setSearchParams }: FilterUIProps) {
  const [filter, setFilter] = useState({
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
  });

  useEffect(() => {
    const currentFilter = {
      category: searchParams.get("category") || "",
      status: searchParams.get("status") || "",
    };
    setFilter(currentFilter);
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    if (filter.category) {
      newParams.set("category", filter.category);
    } else {
      newParams.delete("category");
    }
    if (filter.status) {
      newParams.set("status", filter.status);
    } else {
      newParams.delete("status");
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setFilter({ category: "", status: "" });
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("status");
    setSearchParams(newParams);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer hover:text-gray-500"
          size={"icon"}
        >
          <Filter className="mt-1 size-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 p-10">
        <form className="grid gap-4">
          <div className="mb-4">
            <h4 className="leading-none font-medium text-xl">Filter</h4>
          </div>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="border p-2 rounded-md"
                value={filter.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="financial">Financial</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="border p-2 rounded-md"
                value={filter.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">Select a status</option>
                <option value="publish">Publish</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              variant={"outline"}
              className="cursor-pointer rounded-2xl"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={"outline"}
                className="cursor-pointer rounded-2xl"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer rounded-2xl"
                onClick={applyFilters}
              >
                Filter
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
