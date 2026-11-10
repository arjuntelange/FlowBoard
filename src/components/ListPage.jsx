import React from "react";
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
    <div className="min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <PageHeader
        title={selectedList.name}
        subtitle="Track your personal goals and activities."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="px-4 py-6">

        <InputSection
          task={task}
          setTask={setTask}
          priority={priority}
          setPriority={setPriority}
          onAddTask={onAddTask}
          onHandleKeyDown={onHandleKeyDown}
          setDueDate={setDueDate}
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
    </div>
  );
}

export default React.memo(ListPage);