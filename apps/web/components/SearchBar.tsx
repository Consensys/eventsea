"use client";

import SearchIcon from "../public/icons/SearchIcon";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { getEvents } from "@/lib/actions";
import { EventSea } from "@/types";
import Link from "next/link";
import { Button } from "./ui/Button";

export const SearchBar = () => {
  const [events, setEvents] = useState<EventSea.Event[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);

  const debouncedSearch = debounce((searchValue) => {
    const fetchEvents = async () => {
      if (!searchValue) {
        return setEvents([]);
      }
      const events = await getEvents(searchValue);
      setEvents(events || []);
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
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="px-2 bg-muted md:px-4"
      >
        <SearchIcon className="w-5 h-5 sm:hidden" />
        <div className="justify-between hidden w-36 md:w-48 sm:flex">
          <span className="text-gray-500">Find your next event...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-card-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </Button>
      {open && (
        <CommandDialog
          open={open}
          onOpenChange={() => {
            setOpen(!open);
            setSearchValue("");
            setEvents([]);
          }}
        >
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={searchValue}
              onValueChange={setSearchValue}
              placeholder="Find your next event..."
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandList>
                <CommandList>
                  <CommandGroup>
                    {events.length > 0 && <CommandSeparator />}
                    {events.length > 0 &&
                      events.map(({ id, title }) => (
                        <>
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
                        </>
                      ))}
                  </CommandGroup>
                </CommandList>
              </CommandList>
            </CommandList>
          </Command>
        </CommandDialog>
      )}
    </>
  );
};
