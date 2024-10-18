"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  day: number | null;
};

const Day = ({ day }: Props) => {
  if (!day) {
    return <div className="aspect-square" />;
  }

  const isToday = day === new Date().getDate();

  return (
    <div
      tabIndex={0}
      className={cn(
        "flex aspect-square cursor-pointer flex-col items-center justify-between rounded-lg bg-gray-900/50 p-1 transition hover:bg-gray-900",
        { "bg-gray-900": isToday }
      )}>
      <div className="flex h-1/2 w-full items-center justify-center"></div>
      <span className="text-xl font-medium text-gray-300">{day}</span>
    </div>
  );
};

export default Day;
