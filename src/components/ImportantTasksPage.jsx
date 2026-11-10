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
    <div className="min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <PageHeader
        title="Important"
        subtitle="Focus on tasks that matter most right now."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="px-4 py-6">
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