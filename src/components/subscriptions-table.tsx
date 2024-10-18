import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const SubscriptionTable = () => {
  return (
    <section className="w-full">
      <h2 className="mb-3 text-xl font-bold text-primary-foreground">
        Subscriptions
      </h2>
      <div className="overflow-auto rounded-lg p-4 text-white shadow-sm">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Subscription</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Monthly</TableCell>
              <TableCell>$9.99/month</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default SubscriptionTable;
