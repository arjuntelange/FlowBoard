import React from "react";
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
    <div className="min-h-full w-full bg-app-bg">

      <PageHeader
        title="Completed"
        subtitle="Review your accomplishments and track your progress."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="px-8 py-6">
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

    </div>
  );
}

export default React.memo(CompletedTasksPage);