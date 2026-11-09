import { ChartColumn, CheckCircle2, Clock3, Target } from "lucide-react";

function ProgressOverview({
  completionRate,
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  return (
    <div className="w-full rounded-2xl border border-app-border bg-app-card p-5 shadow-sm">

      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
          <ChartColumn size={20} />
        </div>

        <div>
          <h3 className="text-base font-bold text-app-text">
            Progress Overview
          </h3>
          <p className="text-xs text-app-text-muted">
            Track your productivity
          </p>
        </div>
      </div>

      {totalTasks === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-brand-surface/60 px-4 py-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-primary shadow-sm">
            <Target size={24} />
          </div>

          <p className="text-sm font-semibold text-app-text">
            No progress yet
          </p>

          <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-app-text-muted">
            Add your first task to start tracking progress 🎯
          </p>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-app-text-muted">
                Tasks completed
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-brand-primary">
                  {completionRate}%
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-brand-surface px-3 py-2">
              <Target size={22} className="text-brand-primary" />
            </div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-brand-surface">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-lavender transition-all duration-500"
              style={{
                width: `${completionRate}%`,
              }}
            ></div>
          </div>

          <p className="mt-3 text-sm font-semibold text-brand-secondary">
            {completionRate >= 80
              ? "🔥 Amazing progress!"
              : completionRate >= 50
                ? "🚀 Keep the momentum going!"
                : "💪 Every task counts."}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-xl border border-app-border bg-app-bg p-3">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-app-success" />
                <span className="text-xs font-medium text-app-text-muted">
                  Done
                </span>
              </div>

              <strong className="text-2xl font-bold text-app-text">
                {completedTasks}
              </strong>
            </div>

            <div className="rounded-xl border border-app-border bg-app-bg p-3">
              <div className="mb-2 flex items-center gap-2">
                <Clock3 size={16} className="text-app-warning" />
                <span className="text-xs font-medium text-app-text-muted">
                  Pending
                </span>
              </div>

              <strong className="text-2xl font-bold text-app-text">
                {pendingTasks}
              </strong>
            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default ProgressOverview;
