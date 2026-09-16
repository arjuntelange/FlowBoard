import { useState, useCallback, useEffect } from "react";

function useTasks(showNotification) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((elem) => elem.id !== taskId));

    showNotification(
      "🗑️ Task Deleted",
      "The task has been removed.",
      "success",
    );
  }, [showNotification]);

  const toggleTask = useCallback((currentTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((elem) => {
        if (elem.id === currentTask.id) {
          return { ...elem, completed: !elem.completed };
        }

        return elem;
      }),
    );

    if (currentTask.completed) {
      showNotification("↩️ Task Reopened", "The task is active again.", "info");
    } else {
      showNotification(
        "✅ Task Completed",
        "Great job! Keep going.",
        "success",
      );
    }
  }, [showNotification]);

  const toggleStar = useCallback((currentTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((elem) => {
        if (elem.id === currentTask.id) {
          return { ...elem, starred: !elem.starred };
        }

        return elem;
      }),
    );
  }, [setTasks]);

  return {
    tasks,
    setTasks,
    deleteTask,
    toggleTask,
    toggleStar,
  };
}

export default useTasks;
