"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSubscription } from "@/store/use-subscription";
import { Button } from "./ui/button";
import { Trash } from "@phosphor-icons/react/dist/ssr";

const SubscriptionTable = () => {
  const subscriptions = useSubscription((state) => state.subscriptions);
  const remove = useSubscription((state) => state.removeSubscription);
  return (
    <section className="w-full">
      <h2 className="mb-3 text-xl font-bold text-primary-foreground">
        Subscriptions
      </h2>
      <div className="overflow-auto rounded-lg p-4 text-white shadow-sm">
        <Table>
          <TableHeader className="uppercase">
            <TableRow>
              <TableHead>Subscription</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <subscription.service.icon /> {subscription.service.name}
                  </div>
                </TableCell>
                <TableCell>{subscription.date}</TableCell>
                <TableCell>${subscription.price}</TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(subscription.id)}>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default SubscriptionTable;
