import "./TaskCard.css";
import React from "react";

function TaskCard({ children }) {
  return <section className="task-section">{children}</section>;
}

export default React.memo(TaskCard);
