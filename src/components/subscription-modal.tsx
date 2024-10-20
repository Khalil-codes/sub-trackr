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

const schema = z.object({
  subscription: z.string(),
  price: z.coerce.number(),
  date: z.string(),
});

type FormSchema = z.infer<typeof schema>;

const defaultValues: FormSchema = {
  subscription: "",
  price: 0,
  date: "",
};

const SubscriptionsModal = () => {
  const day = useModal((state) => state.date);
  const subscription = useModal((state) => state.subcription);
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

  const { control, handleSubmit } = form;
  const modal = useModal((state) => state.modal);
  const view = useModal((state) => state.view);
  const setModal = useModal((state) => state.setModal);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log({ ...data, day });
  };

  return (
    <Dialog
      open={modal}
      onOpenChange={(open) => {
        if (!open) {
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
          <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
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
            <FormField
              name="price"
              control={control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Price</FormLabel>
                  <FormControl className="space-y-2">
                    <Input type="number" {...field} />
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
