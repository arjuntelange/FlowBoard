import { ListTodo } from "lucide-react";
import React from "react";
import "./AllTasksPage.css";
import PageHeader from "./PageHeader";
import TasksBoard from "./TasksBoard";
import TaskCard from "./TaskCard";

function AllTasksPage({
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

export default AllTasksPage;
