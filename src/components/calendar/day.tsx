"use client";

import { cn } from "@/lib/utils";
import { useModal } from "@/store/use-modal";
import { useSubscription } from "@/store/use-subscription";
import React, { useMemo } from "react";

type Props = {
  day: number;
};

const Day = ({ day }: Props) => {
  const setModal = useModal((state) => state.setModal);
  const subscriptions = useSubscription((state) => state.subscriptions);

  const subscription = useMemo(
    () => subscriptions.filter((sub) => sub.date === day!.toString()),
    [subscriptions, day]
  );

  const isToday = day === new Date().getDate();

  return (
    <div
      tabIndex={0}
      onClick={() =>
        setModal({ modal: true, view: "add", date: day.toString() })
      }
      className={cn(
        "flex aspect-square cursor-pointer flex-col items-center justify-between rounded-lg bg-gray-900/50 p-1 transition hover:bg-gray-900",
        { "bg-gray-900": isToday }
      )}>
      <div className="isolation-auto flex h-1/2 w-full items-center justify-center text-white">
        {subscription.slice(0, 2).map((sub, index) => (
          <div
            key={sub.id}
            style={{ zIndex: 10 - index }}
            className={cn("rounded-full bg-primary p-2 ring-1", {
              "-ml-2": index > 0,
            })}>
            <sub.service.icon size={14} />
          </div>
        ))}
        {subscription.length > 2 && (
          <div
            style={{ zIndex: 1 }}
            className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs text-primary-foreground ring-1">
            +{subscription.length - 2}
          </div>
        )}
      </div>
      <span className="text-xl font-medium text-gray-300">{day}</span>
    </div>
  );
};

export default Day;
