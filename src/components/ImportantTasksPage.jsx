import React from "react";
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
  notification,
  setIsEditOpen,
  setEditingTask,
  setTaskToDelete,
  setIsDeleteOpen,
}) {
  return (
    <div className="min-h-full w-full bg-app-bg">

      <PageHeader
        title="Important"
        subtitle="Focus on tasks that matter most right now."
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
            notification={notification}
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

export default React.memo(ImportantTasksPage);