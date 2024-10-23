import Calendar from "@/components/calendar";
import SubscriptionsModal from "@/components/subscription-modal";
import SubscriptionTable from "@/components/subscriptions-table";
import { ModeToggle } from "@/components/theme-toggle";
import TotalAmount from "@/components/toal-amount";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-8 px-6 py-14">
      <h1 className="font-giest-mono mb-4 text-center text-2xl font-bold text-primary md:text-4xl">
        Your own subscription tracker
      </h1>
      <Calendar />
      <SubscriptionTable />
      <SubscriptionsModal />
      <div className="fixed right-4 top-4">
        <ModeToggle />
      </div>
    </div>
  );
}
