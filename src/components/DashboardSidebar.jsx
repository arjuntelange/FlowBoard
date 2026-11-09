import MiniCalendar from "./MiniCalendar";
import ProgressOverview from "./ProgressOverview";
import DailyQuote from "./DailyQuote";

function DashboardSidebar({
  completionRate,
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  return (
    <aside className="flex-1 flex flex-col gap-5 p-4">
      <MiniCalendar />

      <ProgressOverview
        completionRate={completionRate}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <DailyQuote />
    </aside>
  );
}

export default DashboardSidebar;
