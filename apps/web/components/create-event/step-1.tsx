import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventSea } from "@/types";
import { formSchema } from "./schema";
import LocationAutoSuggestInput from "../location-autosuggest-input";

interface Step1Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const Step1: React.FC<Step1Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Add title here" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <div className="w-full">
                <LocationAutoSuggestInput
                  fieldValue={field.value}
                  onSelect={(location) => field.onChange(location)}
                />
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Write text here ..." {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EventSea.EventType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step1;
