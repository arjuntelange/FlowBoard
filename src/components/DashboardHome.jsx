
import heroBg from "../assets/purple-bg.jpg";
import StatsCards from "./StatsCards";
import InputSection from "./InputSection";
import TasksBoard from "./TasksBoard";
import DashboardSidebar from "./DashboardSidebar";
import React from "react";

function DashboardHome({
  task,
  setTask,
  priority,
  setPriority,
  setDueDate,
  filteredTasks,
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriorityTasks,
  completionRate,
  emptyMessage,
  searchQuery,
  setSearchQuery,
  addTask,
  toggleTask,
  toggleStar,
  handleKeyDown,
  clearCompletedTasks,
  setIsEditOpen,
  setEditingTask,
  setTaskToDelete,
  setIsDeleteOpen,
}) {
  return (
    <div className="min-h-full w-full overflow-hidden rounded-none bg-app-bg md:rounded-card">

      {/* Hero */}
      <section className="relative mb-4 min-h-48 w-full overflow-hidden sm:mb-6 sm:min-h-56 md:min-h-64 md:rounded-t-2xl">
        <img
          src={heroBg}
          alt="Hero Banner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-tr from-black/40 to-black/10" />

        <div className="relative z-10 flex h-full min-h-48 flex-col justify-between gap-5 p-5 sm:min-h-56 sm:p-7 md:min-h-64 md:flex-row md:items-start md:p-8">

          <div className="mt-2 min-w-0 text-white md:mt-7">
            <h1 className="mb-2 text-2xl font-bold leading-tight text-shadow-lg sm:text-3xl md:text-4xl">
              Good Morning, Arjun 👋
            </h1>

            <p className="text-sm text-white/85 sm:text-base">
              Focus on today, create your future.
            </p>
          </div>

          <div className="w-full md:w-72 lg:w-80">
            <input
              type="text"
              placeholder="Search tasks... 🔍"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-xl border border-white/30 bg-white/85 px-4 py-3 text-sm text-app-text shadow-md outline-none backdrop-blur-sm transition focus:bg-white"
            />
          </div>

        </div>
      </section>

      {/* Dashboard content */}
      <div className="grid min-w-0 grid-cols-1 gap-5 p-3 sm:gap-6 sm:p-5 xl:grid-cols-[minmax(0,1fr)_19rem]">

        <div className="min-w-0">
          <StatsCards
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
            highPriorityTasks={highPriorityTasks}
          />

          <InputSection
            task={task}
            setTask={setTask}
            priority={priority}
            setPriority={setPriority}
            onAddTask={addTask}
            onHandleKeyDown={handleKeyDown}
            setDueDate={setDueDate}
          />

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
        </div>

        <DashboardSidebar
          completionRate={completionRate}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
        />

      </div>
    </div>
  );
}

export default React.memo(DashboardHome);
