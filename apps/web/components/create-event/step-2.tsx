import React from "react";
import { UseFormReturn } from "react-hook-form";
import { UploadCloudIcon } from "lucide-react";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventSea } from "@/types";
import { formSchema } from "./schema";
import { useDropzone } from "react-dropzone";
import ImagePreview from "./image-preview";

interface Step2Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const Step2: React.FC<Step2Props> = ({ form }) => {
  const watchImage = form.watch("image");

  const {
    getRootProps,
    getInputProps,
    open: openFileDialog,
  } = useDropzone({
    maxFiles: 1,
    noClick: true,
    accept: { "image/jpeg": [], "image/png": [] },
    onDrop: (acceptedFiles) => {
      form.setValue("image", acceptedFiles[0]);
    },
  });

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <div
                {...getRootProps({ className: "dropzone" })}
                className="flex flex-col text-muted-foreground justify-center items-center h-[144px] mt-1 text-sm border-2 border-dashed rounded-md leading- bg-muted"
              >
                <input {...getInputProps()} />
                <UploadCloudIcon />
                <span className="font-semibold ">
                  <button
                    className="mr-1"
                    type="button"
                    onClick={openFileDialog}
                  >
                    Click to upload
                  </button>
                  <span className="font-normal"> or </span>
                  <span> drag and drop</span>
                </span>

                <p className="mt-2 text-xs">(recommended size 512x512px)</p>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      {watchImage && (
        <ImagePreview
          image={watchImage}
          handleOnRemove={() => form.resetField("image")}
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="amountOfTickets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount of tickets</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a number"
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value && parseInt(e.target.value))
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ticketPrice.price"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Ticket price</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-1 border rounded-md bg-muted">
                  <Input
                    placeholder="Enter a number"
                    type="number"
                    className="border-0"
                    value={value}
                    onChange={(e) =>
                      onChange(e.target.value && parseFloat(e.target.value))
                    }
                  />
                  <p className="p-2 text-muted-foreground">
                    {EventSea.Currency.ETH}
                  </p>
                  {/* // Hiding currency picker for now, until we support multiple currencies */}
                  {/* <Select
                    value={value.currency}
                    onValueChange={(currency) =>
                      onChange({ ...value, currency })
                    }
                  >
                    <SelectTrigger className="w-1/3 border-0 border-l-2 rounded-none">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(EventSea.Currency).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step2;
