import { SearchIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function EmptyInputGroup() {
  const [inputValue, setInputValue] = useState("/dashboard");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      navigate(inputValue);
      setInputValue("");
    }
  };

  return (
    <Empty className="h-screen my-auto">
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Try searching for pages..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </EmptyContent>
    </Empty>
  );
}
