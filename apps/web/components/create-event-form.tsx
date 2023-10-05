"use client";

import { z } from "zod";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { Calendar } from "@/components/ui/calendar";
import { EventSea } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import ImagePreview from "./image-preview";

const NUM_OF_STEPS = 3;

export default function CreateEventForm() {
  const [step, setStep] = useState(3);
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    title: z.string().nonempty("Title is required"),
    location: z.string().nonempty("Location is required"),
    description: z.string(),
    type: z.nativeEnum(EventSea.EventType),
    image: z.instanceof(File).nullable(),
    // @TODO add number validations for amountOfTickets and price
    amountOfTickets: z.string(),
    ticketPrice: z.object({
      price: z.string(),
      currency: z.nativeEnum(EventSea.Currency),
    }),
    dateTime: z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      type: EventSea.EventType.Conference,
      image: null,
      amountOfTickets: "",
      ticketPrice: {
        price: undefined,
        currency: EventSea.Currency.ETH,
      },
      dateTime: {
        from: new Date(),
      },
    },
    mode: "onChange",
  });

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

  const validateStep = async () => {
    switch (step) {
      case 1:
        return await form.trigger([
          "title",
          "location",
          "description",
          "title",
        ]);
      case 2:
        return await form.trigger([
          "image",
          "amountOfTickets",
          "ticketPrice.currency",
          "ticketPrice.price",
        ]);
      case 3:
        return await form.trigger(["dateTime.from", "dateTime.to"]);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 1:
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
                    <Input placeholder="Enter location" {...field}></Input>
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
      case 2:
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

                      <CloudArrowUpIcon
                        className="w-8 mx-auto text-gray-500"
                        aria-hidden="true"
                      />

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

                      <p className="mt-2 text-xs">
                        (recommended size 512x512px)
                      </p>
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
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ticketPrice"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Ticket price</FormLabel>
                    <FormControl>
                      <div className="flex space-x-1 border rounded-md bg-muted">
                        <Input
                          placeholder="Enter a number"
                          type="number"
                          className="border-0"
                          value={value.price}
                          onChange={(e) =>
                            onChange({
                              ...value,
                              price: e.target.value,
                            })
                          }
                        />
                        <Select
                          value={value.currency}
                          onValueChange={(currency) =>
                            onChange({ ...value, currency })
                          }
                        >
                          <SelectTrigger className="w-1/3 border-0 border-l-2 rounded-none">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(EventSea.Currency).map(
                              (currency) => (
                                <SelectItem key={currency} value={currency}>
                                  {currency}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="dateTime"
              render={({
                field: {
                  value: { from, to },
                  onChange,
                },
              }) => (
                <FormItem>
                  <FormControl>
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={from}
                      selected={{
                        from,
                        to,
                      }}
                      onSelect={(range) => {
                        onChange({
                          from: range?.from,
                          to: range?.to,
                        });
                      }}
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
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setStep(1);
        setOpen((open) => !open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Create event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create event</DialogTitle>
              <DialogDescription>Basic Information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 p-4 sm:h-[450px] overflow-y-auto ">
              {getStepContent(step)}
            </div>
            <DialogFooter>
              <Button
                type="button"
                className="flex-1"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setStep(1);
                  setOpen((open) => !open);
                }}
              >
                Discard
              </Button>
              {step === NUM_OF_STEPS ? (
                <Button type="submit" className="flex-1">
                  <PlusIcon className="w-5 h-5" /> Add new event
                </Button>
              ) : (
                <Button
                  type="button"
                  className="flex-1"
                  onClick={async () => {
                    const isValid = await validateStep();
                    isValid && setStep((prev) => prev + 1);
                  }}
                >
                  Continue
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
