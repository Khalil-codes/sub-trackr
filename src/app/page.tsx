import Calendar from "@/components/calendar";
import SubscriptionsModal from "@/components/subscription-modal";
import SubscriptionTable from "@/components/subscriptions-table";
import { ModeToggle } from "@/components/theme-toggle";
import TotalAmount from "@/components/toal-amount";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
      <Calendar />
      <SubscriptionTable />
      <TotalAmount />
      <SubscriptionsModal />
      <div className="fixed right-4 top-4">
        <ModeToggle />
      </div>
    </div>
  );
}
