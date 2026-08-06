import React from "react";
import "./TaskCard.css";

function TaskCard({ children }) {
  return <section className="task-section">{children}</section>;
}

export default TaskCard;
