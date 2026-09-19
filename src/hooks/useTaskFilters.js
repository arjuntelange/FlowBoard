import { useMemo } from "react";

function useTaskFilters(tasks, selectedList, searchQuery ) {
  const filteredTasks = useMemo(() => {
    let result = tasks;

    switch (selectedList) {
      case "starred":
        result = result.filter((task) => task.starred);
        break;

      case "dashboard":
        result = result.filter((task) => !task.completed);
        break;

      case "completed":
        result = result.filter((task) => task.completed);
        break;

      case "all":
        break;

      default:
        result = result.filter((task) => task.listId === selectedList.id);
    }

    if (searchQuery.trim()) {
      result = result.filter((currentTask) =>
        currentTask.text.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return result;
  }, [tasks, selectedList, searchQuery]);

  const emptyMessage = useMemo(() => {
    if (searchQuery.trim() && filteredTasks.length === 0) {
      return "🔍 No tasks match your search.";
    }

    return "🎉 No tasks yet. Add your first task to get started!";
  }, [searchQuery, filteredTasks]);

  return { filteredTasks, emptyMessage };
}

export default useTaskFilters;
