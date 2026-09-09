import "./Notification.css";
import React from "react";

function Notification({ title, message, type }) {
  return (
    <div className={`toast ${type}`}>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}

export default React.memo(Notification);
