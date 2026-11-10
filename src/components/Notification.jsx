import React from "react";

const notificationStyles = {
  success: {
    border: "border-l-4 border-app-success",
    title: "text-app-success",
  },

  error: {
    border: "border-l-4 border-app-error",
    title: "text-app-error",
  },

  warning: {
    border: "border-l-4 border-app-warning",
    title: "text-app-warning",
  },

  info: {
    border: "border-l-4 border-brand-secondary",
    title: "text-brand-secondary",
  },
};

function Notification({ title, message, type }) {
  const styles = notificationStyles[type] || notificationStyles.info;

  return (
    <div
      className={`fixed left-3 right-3 top-3 z-[1001] rounded-2xl border border-app-border border-l-4 bg-app-card px-4 py-3 shadow-xl animate-[slideIn_0.3s_ease] sm:left-auto sm:right-6 sm:top-6 sm:w-80 sm:px-5 sm:py-4 ${styles.border}`}
    >
      <h4 className={`mb-1.5 text-base font-bold ${styles.title}`}>{title}</h4>
      <p className="text-sm leading-relaxed text-app-text-muted">{message}</p>
    </div>
  );
}

export default React.memo(Notification);
