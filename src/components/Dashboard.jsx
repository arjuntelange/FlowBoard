import { useCallback, useEffect, useState } from "react";
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
import useNotification from "../hooks/useNotification.js";
import useTasksManager from "../hooks/useTasksManager.js";
import useTaskFilters from "../hooks/useTaskFilters.js";
import useDashboardStats from "../hooks/useDashboardStats.js";

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

  const [searchQuery, setSearchQuery] = useState("");

  const [notification, showNotification] = useNotification();

  const {
    tasks,
    task,
    editingTask,
    isEditOpen,
    isDeleteOpen,
    taskToDelete,
    priority,
    dueDate,
    setTasks,
    setTask,
    setEditingTask,
    setIsEditOpen,
    setIsDeleteOpen,
    setTaskToDelete,
    addTask,
    handleKeyDown,
    deleteTask,
    updateTask,
    handleDeleteConfirm,
    toggleTask,
    toggleStar,
    clearCompletedTasks,
    setPriority,
    setDueDate,
  } = useTasksManager(showNotification, selectedList);

  const { filteredTasks, emptyMessage } = useTaskFilters(
    tasks,
    selectedList,
    searchQuery,
  );

  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    highPriorityTasks,
    completionRate,
  } = useDashboardStats(tasks, selectedList);

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
    [lists, setList, setIsInputOpen, showNotification],
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
  }, [
    lists,
    editingList,
    setList,
    setEditingList,
    setIsListEditOpen,
    showNotification,
  ]);

  const handleDeleteList = useCallback(() => {
    setList((prev) => prev.filter((list) => list.id !== listToDelete.id));

    setTasks((prev) => prev.filter((task) => task.listId !== listToDelete.id));

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
  }, [
    lists,
    selectedList,
    listToDelete,
    setTasks,
    setList,
    showNotification,
    setSelectedList,
  ]);

  // ==================================================
  // UI Handlers
  // ==================================================

  

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
          addTask={addTask}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
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
          setIsEditOpen={setIsEditOpen}
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
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          clearCompletedTasks={clearCompletedTasks}
          notification={notification}
          setIsEditOpen={setIsEditOpen}
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
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          clearCompletedTasks={clearCompletedTasks}
          setIsEditOpen={setIsEditOpen}
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
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          clearCompletedTasks={clearCompletedTasks}
          setIsEditOpen={setIsEditOpen}
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
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          clearCompletedTasks={clearCompletedTasks}
          task={task}
          setTask={setTask}
          priority={priority}
          setPriority={setPriority}
          onAddTask={addTask}
          onHandleKeyDown={handleKeyDown}
          setIsEditOpen={setIsEditOpen}
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
