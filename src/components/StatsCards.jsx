import {
  ClipboardList,
  CheckCircle,
  Clock3,
  Flame,
} from "lucide-react";

function StatsCards({
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriorityTasks,
}) {
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      subtitle: "All your tasks",
      icon: ClipboardList,
      color: "text-brand-primary",
      iconBg: "bg-brand-surface",
    },
    {
      title: "Completed",
      value: completedTasks,
      subtitle: "Great progress",
      icon: CheckCircle,
      color: "text-app-success",
      iconBg: "bg-app-success/10",
    },
    {
      title: "Pending",
      value: pendingTasks,
      subtitle: "Keep going",
      icon: Clock3,
      color: "text-app-warning",
      iconBg: "bg-app-warning/10",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      subtitle: "Needs attention",
      icon: Flame,
      color: "text-app-error",
      iconBg: "bg-app-error/10",
    },
  ];

  return (
    <section className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-app-border bg-app-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-medium text-app-text-muted">
                {stat.title}
              </h4>

              <div className={`rounded-xl p-2.5 ${stat.iconBg}`}>
                <Icon size={21} className={stat.color} />
              </div>
            </div>

            <h2 className="mb-1 text-3xl font-bold tracking-tight text-app-text">
              {stat.value}
            </h2>

            <p className="text-xs text-app-text-muted">
              {stat.subtitle}
            </p>
          </div>
        );
      })}
    </section>
  );
}

export default StatsCards;
