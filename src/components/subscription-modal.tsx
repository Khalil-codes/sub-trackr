"use client";

import React, { useEffect } from "react";
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
import { renderServiceIcon } from "@/constants/icons";

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
  const subscription = useModal((state) => state.subscription);
  const modal = useModal((state) => state.modal);
  const view = useModal((state) => state.view);
  const setModal = useModal((state) => state.setModal);
  const addSubscription = useSubscription((state) => state.addSubscription);
  const editSubscription = useSubscription((state) => state.updateSubscription);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { control, handleSubmit, reset, watch, setValue } = form;

  useEffect(() => {
    if (subscription) {
      setValue("subscription", subscription.service.id);

      if (subscription.service.id === "other") {
        setValue("other", subscription.service.name);
      }

      setValue("price", subscription.price);
      setValue("date", subscription.date);
    }
  }, [subscription, setValue]);

  const hasSelectedOther = watch("subscription") === "other";

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const _subscription = SERVICES.find(
      (service) => service.id === data.subscription
    );

    if (!_subscription) return;

    if (!subscription) {
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
    } else {
      const updatedSubscription = {
        ...subscription,
        service: {
          ..._subscription,
          name:
            hasSelectedOther && data.other ? data.other : _subscription.name,
        },
        price: data.price,
      };
      editSubscription(subscription.id, updatedSubscription);
    }

    reset(defaultValues);
    setModal({ modal: false, subscription: null, view: null });
  };

  return (
    <Dialog
      open={modal}
      onOpenChange={(open) => {
        if (!open) {
          reset(defaultValues);
          setModal({ modal: false, subscription: null, view: null });
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
                            {renderServiceIcon(service.id)}
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
                    <Input type="number" placeholder="₹99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
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
