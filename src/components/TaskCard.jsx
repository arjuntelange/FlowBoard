import React from "react";

function TaskCard({ children }) {
  return (
    <section className="mt-10 w-full">
      {children}
    </section>
  );
}

export default React.memo(TaskCard);
