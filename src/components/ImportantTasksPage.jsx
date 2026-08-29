import React from "react";
import "./ImportantTasksPAge.css";
import PageHeader from "./PageHeader";
import TasksBoard from "./TasksBoard";
import TaskCard from "./TaskCard";

function ImportantTasksPage({
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
}) {
  return (
    <div className="important-tasks-page">
      <PageHeader
        title="Importamt"
        subtitle="Focus on tasks that matter most right now."
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
    </div>
  );
}

export default React.memo(ImportantTasksPage);
