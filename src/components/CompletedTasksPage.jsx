import React from "react";
import "./CompletedTasksPage.css";
import PageHeader from "./PageHeader";
import TasksBoard from "./TasksBoard";
import TaskCard from "./TaskCard";

function CompletedTasksPage({
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
    <div className="completed-tasks-page">
      <PageHeader
        title="Completed"
        subtitle="Review your accomplishments and track your progress."
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

export default React.memo(CompletedTasksPage);
