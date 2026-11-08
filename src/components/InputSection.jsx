import React from "react";
import { ChevronDown, Plus, CalendarDays } from "lucide-react";

function InputSection({
  task,
  priority,
  setTask,
  setPriority,
  setDueDate,

  onAddTask,
  onHandleKeyDown,
}) {
  return (
    <section className="mb-8 w-full rounded-2xl border border-app-border bg-app-card p-5 shadow-sm sm:p-6">

      <div className="mb-5">
        <h3 className="text-lg font-bold text-app-text">
          Add a new task
        </h3>
        <p className="mt-1 text-sm text-app-text-muted">
          Capture what needs to get done.
        </p>
      </div>

      <div className="mb-4">
        <input
          onChange={(event) => {
            setTask(event.target.value);
          }}
          onKeyDown={onHandleKeyDown}
          type="text"
          placeholder="What needs to get done?"
          value={task}
          className="w-full rounded-xl border border-app-border bg-app-bg px-4 py-3.5 text-sm text-app-text outline-none transition-all placeholder:text-app-text-muted focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          <div className="relative">
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full appearance-none rounded-xl border border-app-border bg-app-card py-3 pl-4 pr-10 text-sm font-medium text-app-text outline-none transition-all hover:border-brand-lavender focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 sm:w-40"
            >
              <option value="High">🔴 High Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="Low">🟢 Low Priority</option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-app-text-muted"
            />
          </div>

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted"
            />

            <input
              type="date"
              onInput={(event) => {
                const date = event.target.value;

                setDueDate(date);
              }}
              className="w-full rounded-xl border border-app-border bg-app-card py-3 pl-10 pr-3 text-sm text-app-text outline-none transition-all hover:border-brand-lavender focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 sm:w-44"
            />
          </div>
        </div>

        <button
          onClick={onAddTask}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-hover hover:shadow-md active:scale-[0.98] sm:w-auto"
        >
          <Plus size={19} />
          Add Task
        </button>
      </div>
    </section>
  );

}

export default React.memo(InputSection);
