import React from "react";
import "./ListPage.css";
import PageHeader from "./PageHeader";
import TaskCard from "./TaskCard";
import TasksBoard from "./TasksBoard";

function ListPage({
  selectedList,
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
    <div className="user-tasks-page">
      <PageHeader
        title={selectedList.name}
        subtitle="Track your personal goals and activities"
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

export default ListPage;
