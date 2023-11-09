"use client";
import { useState } from "react";
import { z } from "zod";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/Button";
import { Calendar } from "@/components/ui/calendar";
import { ContractPermission, EventSea } from "@/types";
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
import { getEventFactoryContract } from "@/lib/getEventFactoryContract";
import { add } from "@/lib/ipfs";
import {  parseEther } from "ethers";

const NUM_OF_STEPS = 3;

const CreateEventForm = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const formSchema = z.object({
    title: z.string().nonempty("Title is required"),
    location: z.string().nonempty("Location is required"),
    description: z.string(),
    type: z.nativeEnum(EventSea.EventType),
    image: z.custom((value) => {
      if (typeof File !== "undefined" && value instanceof File) {
        return true;
      }
      return false;
    }, "Image is required"),
    amountOfTickets: z.number().positive("Amount of tickets is required"),
    ticketPrice: z.object({
      price: z.number().positive("Price is required"),
      currency: z.nativeEnum(EventSea.Currency),
    }),
    dateTime: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      type: EventSea.EventType.Conference,
      image: undefined,
      amountOfTickets: undefined,
      ticketPrice: {
        price: undefined,
        currency: EventSea.Currency.ETH,
      },
      dateTime: new Date(),
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
        return await form.trigger(["dateTime"]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const eventFactory = await getEventFactoryContract({
      permission: ContractPermission.WRITE,
    });

    const {
      title,
      description,
      location,
      type,
      ticketPrice,
      amountOfTickets,
      dateTime,
      image,
    } = values;

    let imageHash: string | undefined;

    if (image) {
      imageHash = await add({ file: image });
    }

    const resp = await eventFactory.createEvent(
      title,
      description,
      location,
      type,
      imageHash || "",
      Math.floor(dateTime.getTime() / 1000),
      parseEther(ticketPrice.price.toString()),
      BigInt(amountOfTickets)
    );

    await resp.wait();
    form.reset();
    router.refresh();
    setOpen((open) => !open);
  }

  const Step1 = (
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

  const Step2 = (
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

  const Step3 = (
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
        <Button variant="outline" type="button">
          Create event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create event</DialogTitle>
              <DialogDescription>Basic Information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 p-4 sm:h-[450px] overflow-y-auto ">
              {step === 1 && Step1}
              {step === 2 && Step2}
              {step === 3 && Step3}
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
};

export default CreateEventForm;
