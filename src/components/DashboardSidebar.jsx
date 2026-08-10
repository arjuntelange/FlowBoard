import "./DashboardSidebar.css";
import MiniCalendar from "./MiniCalendar";
import { ChartColumn } from "lucide-react";
import ProgressOverview from "./ProgressOverview";
import DailyQuote from "./DailyQuote";

function DashboardSidebar({
  completionRate,
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  return (
    <aside className="dashboard-sidebar">
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
