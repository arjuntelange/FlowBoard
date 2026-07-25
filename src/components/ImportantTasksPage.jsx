import React from "react";
import "./ImportantTasksPAge.css";
import PageHeader from "./PageHeader";
import TasksBoard from "./TasksBoard";
import TaskCard from "./TaskCard";

function ImportantTasksPage({
  searchQuery,
  setSearchQuery,
  filteredTasks,
  filter,
  emptyMessage,
  toggleTask,
  toggleStar,
  deleteTask,
  handleFilter,
  clearCompletedTasks,
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
          filter={filter}
          emptyMessage={emptyMessage}
          toggleTask={toggleTask}
          toggleStar={toggleStar}
          deleteTask={deleteTask}
          handleFilter={handleFilter}
          clearCompletedTasks={clearCompletedTasks}
        />
      </TaskCard>
    </div>
  );
}

export default ImportantTasksPage;
