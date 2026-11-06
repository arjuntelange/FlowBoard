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
    <div className="w-full h-full bg-app-bg rounded-card">
      <div className="relative mb-6 w-full h-auto overflow-hidden rounded-t-2xl">
        <img src={heroBg} alt="Hero Banner" className="block w-full h-full object-cover" />

        <div className="absolute inset-0 flex justify-between items-start p-8 bg-linear-to-tr from-black/15 to-black/25">
          <div className="mt-7 text-white">
            <h1 className="text-4xl font-bold text-shadow-lg/20 mb-2">Good Morning, Arjun 👋</h1>

            <p className="text-base text-shadow-md opacity-80">Focus on today, create your future.</p>
          </div>

          <div className="w-80">
            <input
              type="text"
              placeholder=" Search tasks... 🔍"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full px-3 py-2.5 border-none rounded-xl bg-white/70 shadow-md text-base outline-none backdrop-blur-sm transition duration-300 ease-linear focus:bg-white/60"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="p-4 flex-2">
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
