"use client";

import SearchIcon from "../public/icons/SearchIcon";
import debounce from "lodash.debounce";
import { FC, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getEvents } from "@/lib/actions";
import { EventSea } from "@/types";
import Link from "next/link";
import { Button } from "./ui/Button";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ searchValue, setSearchValue }) => {
  return (
    <CommandInput
      value={searchValue}
      onValueChange={setSearchValue}
      className="combobox-input"
      placeholder="Search an event...."
    />
  );
};

export const SearchBar = () => {
  const [events, setEvents] = useState<EventSea.Event[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const debouncedSearch = debounce((searchValue) => {
    const fetchEvents = async () => {
      if (!searchValue) {
        return setEvents([]);
      }
      setIsLoading(true);
      const events = await getEvents(searchValue);
      setEvents(events || []);
      setIsLoading(false);
    };

    fetchEvents();
  }, 500);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  return (
    <div className="flex items-center gap-4">
      <div className="">
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="px-2 bg-muted md:px-4"
        >
          <SearchIcon className="w-5 h-5 sm:hidden" />
          <div className="justify-between hidden w-36 md:w-48 sm:flex">
            search events
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-card-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </Button>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          setSearchValue("");
          setEvents([]);
        }}
      >
        <SearchInput
          searchValue={searchValue}
          setSearchValue={(val) => setSearchValue(val)}
        />
        <CommandList>
          <CommandEmpty className="py-0">
            {loading ? (
              <div className="w-full h-1 rounded bg-primary animate-pulse"></div>
            ) : (
              <div className="py-6 text-center">No events found</div>
            )}
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {!loading &&
                events.map(({ id, title }) => (
                  <CommandItem
                    key={id}
                    value={title}
                    onSelect={() => {
                      setOpen(false);
                      setSearchValue("");
                      setEvents([]);
                    }}
                  >
                    <Link className="flex-1" href={`/events/${id}`}>
                      {title}
                    </Link>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
