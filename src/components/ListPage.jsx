import React from "react";
import "./ListPage.css";
import PageHeader from "./PageHeader";
import TaskCard from "./TaskCard";
import TasksBoard from "./TasksBoard";
import InputSection from "./InputSection";

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

  task,
  priority,
  setTask,
  setPriority,
  onAddTask,
  onHandleKeyDown,

  isEditOpen,
  setIsEditOpen,
  editingTask,
  setEditingTask,
}) {
  return (
    <div className="user-tasks-page">
      <PageHeader
        title={selectedList.name}
        subtitle="Track your personal goals and activities"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="input-container">
        <InputSection
          task={task}
          setTask={setTask}
          priority={priority}
          setPriority={setPriority}
          onAddTask={onAddTask}
          onHandleKeyDown={onHandleKeyDown}
        />
      </div>

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
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />
      </TaskCard>
    </div>
  );
}

export default ListPage;
