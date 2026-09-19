import { useState, useCallback, useEffect } from "react";

function useTasksManager(showNotification, selectedList) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState("");

  const [editingTask, setEditingTask] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState(null);

  const [priority, setPriority] = useState("Medium");

  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setTask("");
    setPriority("Medium");
  }, [selectedList]);

  const addTask = useCallback(() => {
    if (!task.trim()) return;

    if (
      selectedList === "all" ||
      selectedList === "starred" ||
      selectedList === "dashboard" ||
      selectedList === "completed"
    ) {
      showNotification(
        "📂 Select a List",
        "Please choose a task list before adding tasks.",
        "info",
      );

      return;
    }

    const check = tasks.some(
      (elem) => elem.text.toLowerCase() === task.trim().toLowerCase(),
    );
    if (check) {
      showNotification(
        "⚠️ Task Already Exists",
        "Try adding a different task.",
        "error",
      );
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        priority: priority,
        listId: selectedList.id,
        starred: false,
        dueDate: dueDate,
      },
    ]);
    setTask("");

    showNotification(
      "🎉 Task Added",
      "Your task has been added successfully.",
      "success",
    );
  }, [
    task,
    priority,
    dueDate,
    selectedList,
    tasks,
    setTasks,
    showNotification,
  ]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    },
    [addTask],
  );

  const deleteTask = useCallback(
    (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((elem) => elem.id !== taskId));

      showNotification(
        "🗑️ Task Deleted",
        "The task has been removed.",
        "success",
      );
    },
    [showNotification],
  );

  const updateTask = useCallback(() => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              text: editingTask.text,
              priority: editingTask.priority,
            }
          : task,
      ),
    );

    setIsEditOpen(false);

    showNotification(
      "✏️ Task Updated",
      "Changes saved successfully.",
      "success",
    );
  }, [editingTask, showNotification, setTasks]);

  const handleDeleteConfirm = useCallback(() => {
    deleteTask(taskToDelete);

    setIsDeleteOpen(false);
    setTaskToDelete(null);
  }, [deleteTask, taskToDelete]);

  const toggleTask = useCallback(
    (currentTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((elem) => {
          if (elem.id === currentTask.id) {
            return { ...elem, completed: !elem.completed };
          }

          return elem;
        }),
      );

      if (currentTask.completed) {
        showNotification(
          "↩️ Task Reopened",
          "The task is active again.",
          "info",
        );
      } else {
        showNotification(
          "✅ Task Completed",
          "Great job! Keep going.",
          "success",
        );
      }
    },
    [showNotification],
  );

  const toggleStar = useCallback((currentTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((elem) => {
        if (elem.id === currentTask.id) {
          return { ...elem, starred: !elem.starred };
        }

        return elem;
      }),
    );
  }, []);

  const clearCompletedTasks = useCallback(() => {
    const checkTask = tasks.some((taskCheck) => taskCheck.completed);

    if (checkTask) {
      setTasks((prevTasks) =>
        prevTasks.filter((currentTask) => !currentTask.completed),
      );

      showNotification(
        "🧹 Tasks Cleared",
        "All completed tasks have been removed.",
        "success",
      );
    } else {
      showNotification(
        "ℹ️ Nothing to Clear",
        "There are no completed tasks to remove.",
        "info",
      );
    }
  }, [tasks, setTasks, showNotification]);

  return {
    tasks,
    task,
    editingTask,
    isEditOpen,
    isDeleteOpen,
    priority,
    setTasks,
    setTask,
    setEditingTask,
    setIsEditOpen,
    setIsDeleteOpen,
    setTaskToDelete,
    addTask,
    handleKeyDown,
    updateTask,
    handleDeleteConfirm,
    toggleTask,
    toggleStar,
    clearCompletedTasks,
    setPriority,
    setDueDate,
  };
}

export default useTasksManager;
