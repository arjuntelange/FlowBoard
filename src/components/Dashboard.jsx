import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Rocket, Star } from "lucide-react";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome.jsx";
import AllTasksPage from "./AllTasksPage";
import ImportantTasksPage from "./ImportantTasksPage";
import CompletedTasksPage from "./CompletedTasksPage";
import ListPage from "./ListPage.jsx";
import EditTaskModal from "./EditTaskModal.jsx";
import DeleteConfirm from "./DeleteConfirm.jsx";
import ListInputModal from "./ListInputModal.jsx";
import ListEditModal from "./ListEditModal.jsx";
import ListDeleteModal from "./ListDeleteModal.jsx";

function Dashboard({
  lists,
  selectedList,
  setSelectedList,
  setList,
  isInputOpen,
  setIsInputOpen,
  isListEditOpen,
  setIsListEditOpen,
  editingList,
  setEditingList,
  isListDeleteOpen,
  setIsListDeleteOpen,
  listToDelete,
  setListToDelete,
}) {
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
  // List Actions
  // ======================

  const handleCreateList = useCallback(
    (listName) => {
      if (!listName.trim()) {
        showNotification(
          "⚠️ Invalid Name",
          "List name cannot be empty.",
          "error",
        );
        return;
      }

      const duplicate = lists.some(
        (list) => list.name.toLowerCase() === listName.trim().toLowerCase(),
      );

      if (duplicate) {
        showNotification(
          "⚠️ List Already Exists",
          "Choose a different name.",
          "error",
        );
        return;
      }

      setList((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: listName.trim(),
        },
      ]);

      setIsInputOpen(false);

      showNotification(
        "🎉 List Created",
        "New task list added successfully.",
        "success",
      );
    },
    [lists],
  );

  const handleEditList = useCallback(() => {
    if (!editingList?.name.trim()) {
      showNotification(
        "⚠️ Invalid List Name",
        "List name cannot be empty.",
        "error",
      );

      return;
    }

    const duplicate = lists.some(
      (list) =>
        list.id !== editingList.id &&
        list.name.trim().toLowerCase() ===
          editingList.name.trim().toLowerCase(),
    );

    if (duplicate) {
      showNotification(
        "⚠️ List Already Exists",
        "Choose a different name.",
        "error",
      );

      return;
    }

    setList((prevList) =>
      prevList.map((list) =>
        list.id === editingList.id
          ? { ...list, name: editingList.name.trim() }
          : list,
      ),
    );

    setIsListEditOpen(false);
    setEditingList(null);

    showNotification(
      "✏️ List Updated",
      "List name updated successfully.",
      "success",
    );
  }, [lists, editingList]);

  const handleDeleteList = useCallback(() => {
    setList(lists.filter((list) => list.id !== listToDelete.id));

    setTasks(tasks.filter((task) => task.listId !== listToDelete.id));

    setIsListDeleteOpen(false);

    setListToDelete(null);

    if (selectedList.id === listToDelete.id) {
      setSelectedList("dashboard");
    }

    showNotification(
      "🗑️ List Deleted",
      "The list and all its tasks have been removed.",
      "success",
    );
  }, [lists, tasks, selectedList, listToDelete]);

  // ======================
  // Task Actions
  // ======================

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
  }, [task, priority, dueDate, selectedList, tasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((elem) => elem.id !== taskId));

    showNotification(
      "🗑️ Task Deleted",
      "The task has been removed.",
      "success",
    );
  }, []);

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
  }, []);

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
  }, [tasks]);

  const updateTask = useCallback(() => {
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
  }, [tasks, editingTask, showNotification]);

  const handleDeleteConfirm = useCallback(() => {
    deleteTask(taskToDelete);

    setIsDeleteOpen(false);
    setTaskToDelete(null);
  }, [deleteTask, taskToDelete]);

  // ==================================================
  // UI Handlers
  // ==================================================

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    },
    [addTask],
  );

  const handleFilter = useCallback((filterType) => {
    setFilter(filterType);
  }, []);

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

  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    highPriorityTasks,
    completionRate,
  } = useMemo(() => {
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

  // ======================
  // Filtered Task Data
  // ======================

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

    return result;
  }, [tasks, selectedList]);

  let emptyMessage = "🎉 No tasks yet. Add your first task to get started!";

  if (searchQuery.trim()) {
    filteredTasks = filteredTasks.filter((currentTask) =>
      currentTask.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (searchQuery.trim() && filteredTasks.length === 0) {
    emptyMessage = "🔍 No tasks match your search.";
  }

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  if (filter === "starred") {
    filteredTasks = filteredTasks.filter((task) => task.starred);
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
          notification={notification}
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

      <ListInputModal
        isOpen={isInputOpen}
        onClose={() => setIsInputOpen(false)}
        onCreateList={handleCreateList}
      />

      <ListEditModal
        isOpen={isListEditOpen}
        onClose={() => {
          setIsListEditOpen(false);
          setEditingList(null);
        }}
        editingList={editingList}
        setEditingList={setEditingList}
        onSave={handleEditList}
      />

      <ListDeleteModal
        isOpen={isListDeleteOpen}
        onClose={() => {
          setIsListDeleteOpen(false);
          setListToDelete(null);
        }}
        listToDelete={listToDelete}
        onConfirm={handleDeleteList}
      />
    </>
  );
}

export default Dashboard;
