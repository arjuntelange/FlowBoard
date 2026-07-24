import React from "react";
import TodoList from "./TodoList";
import "./Dashboard.css";
import AllTasksPage from "./AllTasksPage";
import ImportantTasksPage from "./ImportantTasksPage";
import CompletedTasksPage from "./CompletedTasksPage";

function Dashboard({ lists, selectedList }) {
  let content;

  switch (selectedList) {
    case "all":
      content = <AllTasksPage />;
      break;

    case "starred":
      content = <ImportantTasksPage />;
      break;

    case "completed":
      content = <CompletedTasksPage />;
      break;

    default:
      content = <TodoList selectedList={selectedList} lists={lists} />;
  }

  return <main className="dashboard">{content}</main>;
}

export default Dashboard;
