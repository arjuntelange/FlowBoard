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
  emptyMessage,
  toggleTask,
  toggleStar,
  clearCompletedTasks,

  task,
  priority,
  setTask,
  setPriority,
  onAddTask,
  onHandleKeyDown,

  setIsEditOpen,
  setEditingTask,
  setTaskToDelete,
  setIsDeleteOpen,
  setDueDate,
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
          setDueDate={setDueDate}
        />
      </div>

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

export default React.memo(ListPage);
