"use client";

import { getDaysOfCurrentMonth } from "@/lib/utils";
import React from "react";
import Day from "./day";
import Header from "./header";

const Calendar = () => {
  const days = getDaysOfCurrentMonth();
  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl bg-white/80 p-8 backdrop-blur-lg dark:bg-black">
      <Header />
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) =>
          day ? (
            <Day day={day} key={i} />
          ) : (
            <div key={i} className="aspect-square" />
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
