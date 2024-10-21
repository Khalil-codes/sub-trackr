"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useModal } from "@/store/use-modal";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SERVICES } from "@/constants/services";
import { useSubscription } from "@/store/use-subscription";
import { v4 as uuid } from "uuid";

const schema = z.object({
  subscription: z.string(),
  other: z.string().optional(),
  price: z.coerce.number(),
  date: z.string(),
});

type FormSchema = z.infer<typeof schema>;

const defaultValues: FormSchema = {
  subscription: "",
  price: 0,
  other: "",
  date: "",
};

const SubscriptionsModal = () => {
  const day = useModal((state) => state.date);
  const subscription = useModal((state) => state.subcription);
  const modal = useModal((state) => state.modal);
  const view = useModal((state) => state.view);
  const setModal = useModal((state) => state.setModal);
  const addSubscription = useSubscription((state) => state.addSubscription);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: subscription
      ? {
          date: subscription.date,
          subscription: subscription.service.id,
          price: subscription.price,
        }
      : defaultValues,
  });

  const { control, handleSubmit, reset, watch } = form;

  const hasSelectedOther = watch("subscription") === "other";

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    if (!subscription) {
      const _subscription = SERVICES.find(
        (service) => service.id === data.subscription
      );

      if (_subscription) {
        addSubscription({
          id: uuid(),
          service: {
            ..._subscription,
            name:
              hasSelectedOther && data.other ? data.other : _subscription.name,
          },
          price: data.price,
          date: day!,
        });
      }
    }

    reset();
    setModal({ modal: false, subcription: null, view: null });
  };

  return (
    <Dialog
      open={modal}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          setModal({ modal: false, subcription: null, view: null });
        }
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {view === "add" && "Add Subscription"}
            {view === "edit" && "Edit Subscription"}
            {view === "view" && "View Subscription"}
          </DialogTitle>
          <DialogDescription>
            {subscription
              ? subscription.service.name
              : "What would you like to add?"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="subscription-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4">
            <FormField
              name="subscription"
              control={control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Subscription</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex items-center gap-2">
                            <service.icon />
                            <span>{service.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {hasSelectedOther && (
              <FormField
                name="other"
                rules={{ required: hasSelectedOther }}
                control={control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Other</FormLabel>
                    <FormControl className="space-y-2">
                      <Input type="text" placeholder="XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="price"
              control={control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Price</FormLabel>
                  <FormControl className="space-y-2">
                    <Input type="number" placeholder="$2.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionsModal;
