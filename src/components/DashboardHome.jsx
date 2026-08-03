import React from "react";
import heroBg from "../assets/hero-bg-img.png";

import Notification from "./Notification";
import StatsCards from "./StatsCards";
import InputSection from "./InputSection";
import TasksBoard from "./TasksBoard";
import "./DashboardHome.css";
import DashboardSidebar from "./DashboardSidebar";

function DashboardHome({
  task,
  setTask,

  priority,
  setPriority,

  setDueDate,

  filter,

  filteredTasks,
  
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriorityTasks,
  completionRate,

  emptyMessage,

  searchQuery,
  setSearchQuery,

  notification,

  addTask,
  deleteTask,
  toggleTask,
  toggleStar,

  handleFilter,
  handleKeyDown,
  clearCompletedTasks,

  isEditOpen,
  setIsEditOpen,
  editingTask,
  setEditingTask,
  setTaskToDelete,
  setIsDeleteOpen,
}) {
  return (
    <div className="container">
      <div className="hero-banner">
        <img src={heroBg} alt="Hero Banner" />

        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Good Morning, Arjun 👋</h1>

            <p>Focus on today, create your future.</p>
          </div>

          <div className="hero-search">
            <input
              type="text"
              placeholder=" Search tasks... 🔍"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
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
            filter={filter}
            filteredTasks={filteredTasks}
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

      {notification.message && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
}

export default DashboardHome;
