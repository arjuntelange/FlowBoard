import { useMemo } from "react";

function useDashboardStats(tasks) {
  return useMemo(() => {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter((task) => task.completed).length;

    const pendingTasks = tasks.length - completedTasks;

    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "High",
    ).length;

    const completionRate =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
      completionRate,
    };
  }, [tasks]);
}

export default useDashboardStats;
