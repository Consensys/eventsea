import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "./schema";
import { Calendar } from "../ui/calendar";

interface Step3Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const Step3: React.FC<Step3Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="dateTime"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormControl>
              <Calendar
                initialFocus
                mode="single"
                selected={value}
                disabled={(date) => date < new Date()}
                onSelect={onChange}
                numberOfMonths={2}
                className="p-0"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step3;
