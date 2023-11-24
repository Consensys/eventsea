"use client";

import usePlacesAutocomplete from "use-places-autocomplete";
import Script from "next/script";
import { FC, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface LocationAutoSuggestInputProps {
  fieldValue: string;
  onSelect: (location: string) => void;
}

const LocationAutoSuggestInput: FC<LocationAutoSuggestInputProps> = ({
  fieldValue,
  onSelect,
}) => {
  const [mapOpen, setMapOpen] = useState(false);

  const {
    init,
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  return (
    <Popover
      open={mapOpen}
      onOpenChange={() => {
        clearSuggestions();
        setMapOpen(!mapOpen);
        setValue("");
      }}
    >
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onReady={init}
      />
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={mapOpen}
          className="justify-between w-full"
        >
          {fieldValue || "Select a location..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-[400px] p-0">
        <Command>
          <CommandInput
            value={value}
            onValueChange={setValue}
            disabled={!ready}
            className="combobox-input"
            placeholder="Search an address"
          />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <CommandItem
                    key={place_id}
                    value={description}
                    onSelect={(currentValue) => {
                      onSelect(currentValue);
                      clearSuggestions();
                      setMapOpen(false);
                    }}
                  >
                    {description}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationAutoSuggestInput;
