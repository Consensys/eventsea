"use client";

import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSDK } from "@metamask/sdk-react";
import { useForm } from "react-hook-form";
import { RotateCw, Plus } from "lucide-react";
import { parseEther } from "ethers";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/Button";
import { Form } from "@/components/ui/form";

import { getEventFactoryContract } from "@/lib/getEventFactoryContract";
import { add } from "@/lib/ipfs";
import { formSchema } from "./schema";
import { ContractPermission, EventSea } from "@/types";

import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";

const NUM_OF_STEPS = 3;
const LINEA_TESTNET_CHAIN = "0xe704";

const CreateEventForm = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [chainId, setChainId] = useState<string | null>(null);

  useEffect(() => {
    if (window?.ethereum?.chainId) {
      setChainId(window?.ethereum?.chainId);
    }
  }, []);

  const { connected } = useSDK();
  const isOnLineaTestnet = chainId === LINEA_TESTNET_CHAIN;
  const isOnLocal = chainId === "0x7a69";

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: {
        placeId: "",
        description: "",
      },
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
    setIsSubmitting(true);
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

    startTransition(async () => {
      const formData = new FormData();
      let imageHash: string | undefined;

      if (image) {
        formData.append("file", image);
        imageHash = await add(formData);
      }

      const ticketPriceInWei = parseEther(ticketPrice.price.toString());

      try {
        const resp = await eventFactory.createEvent(
          title,
          description,
          location.placeId,
          type,
          imageHash || "",
          Math.floor(dateTime.getTime() / 1000),
          ticketPriceInWei,
          BigInt(amountOfTickets)
        );

        await resp.wait();
        form.reset();
        setIsSubmitting(false);
        router.refresh();
        setOpen((open) => !open);
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    });
  }

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
        {(connected && isOnLineaTestnet) ||
          (isOnLocal && (
            <Button variant="outline" type="button">
              <span className="hidden md:block">Create event</span>
              <span className="block md:hidden">Create</span>
            </Button>
          ))}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create event</DialogTitle>
              <DialogDescription>Basic Information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 p-4 sm:h-[450px] overflow-y-auto ">
              {step === 1 && <Step1 form={form} />}
              {step === 2 && <Step2 form={form} />}
              {step === 3 && <Step3 form={form} />}
            </div>
            <DialogFooter>
              {step > 1 && (
                <Button
                  type="button"
                  className="flex-1"
                  variant="outline"
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  Go back
                </Button>
              )}
              {step === NUM_OF_STEPS ? (
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <RotateCw size={20} className="animate-spin" />
                  ) : (
                    <Plus size={20} />
                  )}
                  <span className="ml-1">Add new event</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  className="flex-1"
                  onClick={async (e) => {
                    e.preventDefault();
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
