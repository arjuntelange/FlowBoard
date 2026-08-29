import React from "react";
import "./AllTasksPage.css";
import PageHeader from "./PageHeader";
import TasksBoard from "./TasksBoard";
import TaskCard from "./TaskCard";
import Notification from "./Notification";

function AllTasksPage({
  searchQuery,
  setSearchQuery,
  filteredTasks,
  emptyMessage,
  toggleTask,
  toggleStar,
  clearCompletedTasks,
  setIsEditOpen,
  setEditingTask,
  setTaskToDelete,
  setIsDeleteOpen,
  notification,
}) {
  return (
    <div className="all-tasks-page">
      <PageHeader
        title="All Tasks"
        subtitle="Manage and organize all your tasks"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <TaskCard>
        <TasksBoard
          filteredTasks={filteredTasks}
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          clearCompletedTasks={clearCompletedTasks}
          setIsEditOpen={setIsEditOpen}
          setEditingTask={setEditingTask}
          setTaskToDelete={setTaskToDelete}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </TaskCard>

      {notification.message && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
}

export default React.memo(AllTasksPage);
