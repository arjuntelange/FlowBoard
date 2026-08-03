import React, { useEffect, useRef, useState } from "react";
import { Rocket, Star } from "lucide-react";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome.jsx";
import AllTasksPage from "./AllTasksPage";
import ImportantTasksPage from "./ImportantTasksPage";
import CompletedTasksPage from "./CompletedTasksPage";
import ListPage from "./ListPage.jsx";
import EditTaskModal from "./EditTaskModal.jsx";
import DeleteConfirm from "./DeleteConfirm.jsx";

function Dashboard({ lists, selectedList }) {
  // ======================
  // State
  // ======================

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [priority, setPriority] = useState("Medium");

  const [dueDate, setDueDate] = useState("");

  const [filter, setFilter] = useState("all");

  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editingTask, setEditingTask] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [taskToDelete, setTaskToDelete] = useState(null);

  // ==================================================
  // Refs
  // ==================================================

  const timerRef = useRef(null);

  // ======================
  // Effects
  // ======================

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setTask("");
    setPriority("Medium");
  }, [selectedList]);

  // ======================
  // Task Actions
  // ======================

  function addTask() {
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
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((elem) => elem.id !== taskId));

    showNotification(
      "🗑️ Task Deleted",
      "The task has been removed.",
      "success",
    );
  }

  function toggleTask(currentTask) {
    setTasks(
      tasks.map((elem) => {
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
  }

  function toggleStar(currentTask) {
    setTasks(
      tasks.map((elem) => {
        if (elem.id === currentTask.id) {
          return { ...elem, starred: !elem.starred };
        }

        return elem;
      }),
    );
  }

  function clearCompletedTasks() {
    const checkTask = tasks.some((taskCheck) => taskCheck.completed);

    if (checkTask) {
      setTasks(tasks.filter((currentTask) => !currentTask.completed));

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
  }

  function updateTask() {
    setTasks(
      tasks.map((task) =>
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
  }

  function handleDeleteConfirm() {
    deleteTask(taskToDelete);

    setIsDeleteOpen(false);
    setTaskToDelete(null);
  }

  // ==================================================
  // UI Handlers
  // ==================================================

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function handleFilter(filterType) {
    setFilter(filterType);
  }

  function showNotification(title, message, type) {
    setNotification({
      title: title,
      message: message,
      type: type,
    });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setNotification({
        title: "",
        message: "",
        type: "",
      });
    }, 2000);
  }

  // ======================
  // Dashboard Statistics
  // ======================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High",
  ).length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // ======================
  // Filtered Task Data
  // ======================

  let filteredTasks = tasks;

  let emptyMessage = "🎉 No tasks yet. Add your first task to get started!";

  switch (selectedList) {
    case "starred":
      filteredTasks = filteredTasks.filter((task) => task.starred);
      break;

    case "dashboard":
      filteredTasks = filteredTasks.filter((task) => !task.completed);
      break;

    case "completed":
      filteredTasks = filteredTasks.filter((task) => task.completed);
      break;

    case "all":
      break;

    default:
      filteredTasks = filteredTasks.filter(
        (task) => task.listId === selectedList.id,
      );
  }

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  if (searchQuery.trim()) {
    filteredTasks = filteredTasks.filter((currentTask) =>
      currentTask.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (searchQuery.trim() && filteredTasks.length === 0) {
    emptyMessage = "🔍 No tasks match your search.";
  }

  // ==================================================
  // Page Routing
  // ==================================================

  let content;

  switch (selectedList) {
    case "dashboard":
      content = (
        <DashboardHome
          task={task}
          setTask={setTask}
          filteredTasks={filteredTasks}
          priority={priority}
          setPriority={setPriority}
          filter={filter}
          addTask={addTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          handleFilter={handleFilter}
          clearCompletedTasks={clearCompletedTasks}
          notification={notification}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          highPriorityTasks={highPriorityTasks}
          completionRate={completionRate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyDown={handleKeyDown}
          emptyMessage={emptyMessage}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setTaskToDelete={setTaskToDelete}
          setIsDeleteOpen={setIsDeleteOpen}
          setDueDate={setDueDate}
        />
      );
      break;

    case "all":
      content = (
        <AllTasksPage
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredTasks={filteredTasks}
          filter={filter}
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          deleteTask={deleteTask}
          handleFilter={handleFilter}
          clearCompletedTasks={clearCompletedTasks}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setTaskToDelete={setTaskToDelete}
          setIsDeleteOpen={setIsDeleteOpen}
          setDueDate={setDueDate}
        />
      );
      break;

    case "starred":
      content = (
        <ImportantTasksPage
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredTasks={filteredTasks}
          filter={filter}
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          deleteTask={deleteTask}
          handleFilter={handleFilter}
          clearCompletedTasks={clearCompletedTasks}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setTaskToDelete={setTaskToDelete}
          setIsDeleteOpen={setIsDeleteOpen}
          setDueDate={setDueDate}
        />
      );
      break;

    case "completed":
      content = (
        <CompletedTasksPage
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredTasks={filteredTasks}
          filter={filter}
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          deleteTask={deleteTask}
          handleFilter={handleFilter}
          clearCompletedTasks={clearCompletedTasks}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setTaskToDelete={setTaskToDelete}
          setIsDeleteOpen={setIsDeleteOpen}
          setDueDate={setDueDate}
        />
      );
      break;

    default:
      content = (
        <ListPage
          selectedList={selectedList}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredTasks={filteredTasks}
          filter={filter}
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          deleteTask={deleteTask}
          handleFilter={handleFilter}
          clearCompletedTasks={clearCompletedTasks}
          task={task}
          setTask={setTask}
          priority={priority}
          setPriority={setPriority}
          onAddTask={addTask}
          onHandleKeyDown={handleKeyDown}
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setTaskToDelete={setTaskToDelete}
          setIsDeleteOpen={setIsDeleteOpen}
          setDueDate={setDueDate}
        />
      );
  }

  // ==================================================
  // Render
  // ==================================================
  return (
    <>
      <main className="dashboard">{content}</main>

      <EditTaskModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        onSave={updateTask}
      />

      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default Dashboard;
