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
import { useModal } from "@/store/use-modal";
import { renderServiceIcon } from "@/constants/icons";

const SubscriptionTable = () => {
  const subscriptions = useSubscription((state) => state.subscriptions);
  const remove = useSubscription((state) => state.removeSubscription);
  const setModal = useModal((state) => state.setModal);
  return (
    <section className="w-full">
      <h2 className="mb-3 text-xl font-bold text-primary">Subscriptions</h2>
      <div className="overflow-auto rounded-lg bg-white/80 p-6 text-primary shadow-sm dark:bg-black">
        <Table>
          <TableHeader className="bg-gray-200/70 uppercase dark:bg-gray-800/50 [&_tr]:border-none">
            <TableRow className="rounded-xl hover:bg-gray-200 dark:hover:bg-gray-900">
              <TableHead className="h-14 text-primary">Subscription</TableHead>
              <TableHead className="h-14 text-primary">Date</TableHead>
              <TableHead className="h-14 text-primary">Cost</TableHead>
              <TableHead className="h-14 text-primary">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow
                key={subscription.id}
                className="border-b-[0.5px] border-b-gray-500 hover:bg-gray-200 dark:hover:bg-gray-900">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {renderServiceIcon(subscription.service.id)}
                    <span>{subscription.service.name}</span>
                  </div>
                </TableCell>
                <TableCell>{subscription.date}</TableCell>
                <TableCell>₹{subscription.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="py-1"
                      variant="ghost"
                      onClick={() =>
                        setModal({ modal: true, subscription, view: "edit" })
                      }>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="py-1"
                      variant="destructive"
                      onClick={() => remove(subscription.id)}>
                      Delete
                    </Button>
                  </div>
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
