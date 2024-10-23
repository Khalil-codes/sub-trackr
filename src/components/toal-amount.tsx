"use client";

import { useSubscription } from "@/store/use-subscription";
import React, { useEffect, useMemo } from "react";

const defaultTitle = "Subscriptions Tracker";

const TotalAmount = () => {
  const subscriptions = useSubscription((state) => state.subscriptions);

  const totalAmount = useMemo(() => {
    return subscriptions.map((sub) => sub.price).reduce((a, b) => a + b, 0);
  }, [subscriptions]);

  useEffect(() => {
    if (document && subscriptions.length > 0) {
      document.title = `${subscriptions.length} (₹${totalAmount}) Subscriptions`;
    }
    return () => {
      document.title = defaultTitle;
    };
  }, [totalAmount, subscriptions]);

  return (
    <h2 className="font-giest-mono text-xl font-bold text-primary">
      Total Amount:{" "}
      <span className="text-2xl">
        ₹&nbsp;
        {totalAmount}
      </span>
    </h2>
  );
};

export default TotalAmount;
