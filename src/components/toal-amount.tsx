"use client";

import { useSubscription } from "@/store/use-subscription";
import React from "react";

const TotalAmount = () => {
  const subscriptions = useSubscription((state) => state.subscriptions);

  return (
    <h2 className="text-xl font-bold text-primary-foreground">
      Total Amount:{" "}
      <span className="text-3xl">
        ₹&nbsp;
        {subscriptions.map((sub) => sub.price).reduce((a, b) => a + b, 0)}
      </span>
    </h2>
  );
};

export default TotalAmount;
