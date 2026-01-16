import { FilterUI } from "@/components/story-management/FilterUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const StoryManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

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
    <div>
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
          <FilterUI />
          <div className="border self-stretch mx-2" />
          <Button
            size="lg"
            className="rounded-3xl cursor-pointer hover:scale-101 py-6"
          >
            <Plus />
            Add Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryManagement;
