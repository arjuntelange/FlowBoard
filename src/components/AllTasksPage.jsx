import { ListTodo } from "lucide-react";
import React from "react";
import "./AllTasksPage.css";
import PageHeader from "./PageHeader";
import TasksBoard from "./TasksBoard";

function AllTasksPage({ searchQuery, setSearchQuery }) {
  return (
    <div className="all-card">
      <PageHeader
        title="All Tasks"
        subtitle="Manage and organize all your tasks"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* <TaskCard>
        <TasksBoard />
      </TaskCard> */}
    </div>
  );
}

export default AllTasksPage;
