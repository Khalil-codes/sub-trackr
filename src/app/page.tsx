import Calendar from "@/components/calendar";
import SubscriptionTable from "@/components/subscriptions-table";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
      <Calendar />
      <SubscriptionTable />
    </div>
  );
}
