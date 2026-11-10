
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
    <aside className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:flex xl:flex-col">
      <MiniCalendar />

      <ProgressOverview
        completionRate={completionRate}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <div className="sm:col-span-2 xl:col-span-1">
        <DailyQuote />
      </div>
    </aside>
  );
}

export default DashboardSidebar;
