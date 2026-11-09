import React, { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import {
  Star,
  MoreVertical,
  ChevronDown,
  ListFilter,
  CalendarDays,
  ArrowUpDown,
  CheckCircle2,
  Trash2,
  SlidersHorizontal,
  X,
} from "lucide-react";

const priorityOrder = {
  Low: 1,
  Medium: 2,
  High: 3,
};

function TasksBoard({
  filteredTasks,
  emptyMessage,
  toggleTask,
  toggleStar,
  clearCompletedTasks,
  setIsEditOpen,
  setEditingTask,
  setTaskToDelete,
  setIsDeleteOpen,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    active: false,
    completed: false,
    starred: false,
    highPriority: false,
    mediumPriority: false,
    lowPriority: false,
    overdue: false,
    dueToday: false,
  });

  const filterRef = useRef(null);

  useEffect(() => {
    function closeMenu() {
      setOpenMenu(null);
    }

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function toggleFilter(filterName) {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  }

  function clearFilters() {
    setSelectedFilters({
      active: false,
      completed: false,
      starred: false,
      highPriority: false,
      mediumPriority: false,
      lowPriority: false,
      overdue: false,
      dueToday: false,
    });
  }

  const processedTasks = useMemo(() => {
    const taskCopy = [...filteredTasks];

    switch (sortBy) {
      case "due-asc":
        taskCopy.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return (
            moment(a.dueDate, "DD-MM-YYYY") -
            moment(b.dueDate, "DD-MM-YYYY")
          );
        });
        break;

      case "due-desc":
        taskCopy.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return (
            moment(b.dueDate, "DD-MM-YYYY") -
            moment(a.dueDate, "DD-MM-YYYY")
          );
        });
        break;

      case "priority-asc":
        taskCopy.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
        break;

      case "priority-desc":
        taskCopy.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
        break;

      case "az":
        taskCopy.sort((a, b) => {
          return a.text.localeCompare(b.text);
        });
        break;

      case "za":
        taskCopy.sort((a, b) => {
          return b.text.localeCompare(a.text);
        });
        break;

      default:
        break;
    }

    return taskCopy;
  }, [filteredTasks, sortBy]);

  const { statusFilters, priorityFilters, otherFilters } =
    useMemo(() => {
      const activeFilters = Object.entries(selectedFilters)
        .filter(([, value]) => value)
        .map(([key]) => key);

      const statusFilters = activeFilters.filter(
        (filter) => filter === "active" || filter === "completed"
      );

      const priorityFilters = activeFilters.filter(
        (filter) =>
          filter === "highPriority" ||
          filter === "mediumPriority" ||
          filter === "lowPriority"
      );

      const otherFilters = activeFilters.filter(
        (filter) =>
          filter === "starred" ||
          filter === "overdue" ||
          filter === "dueToday"
      );

      return { statusFilters, priorityFilters, otherFilters };
    }, [selectedFilters]);

  const filteredBySelectedFilters = useMemo(() => {
    return processedTasks.filter((task) => {
      const statusMatches =
        statusFilters.length === 0 ||
        statusFilters.some((filter) => {
          switch (filter) {
            case "active":
              return !task.completed;

            case "completed":
              return task.completed;

            default:
              return false;
          }
        });

      const priorityMatches =
        priorityFilters.length === 0 ||
        priorityFilters.some((filter) => {
          switch (filter) {
            case "highPriority":
              return task.priority === "High";

            case "mediumPriority":
              return task.priority === "Medium";

            case "lowPriority":
              return task.priority === "Low";

            default:
              return false;
          }
        });

      const otherFiltersMatch =
        otherFilters.length === 0 ||
        otherFilters.every((filter) => {
          switch (filter) {
            case "overdue":
              return (
                task.dueDate &&
                moment(task.dueDate, "DD-MM-YYYY").isBefore(moment(), "day")
              );

            case "dueToday":
              return (
                task.dueDate &&
                moment(task.dueDate, "DD-MM-YYYY").isSame(moment(), "day")
              );

            case "starred":
              return task.starred;

            default:
              return false;
          }
        });

      return statusMatches && priorityMatches && otherFiltersMatch;
    });
  }, [processedTasks, priorityFilters, statusFilters, otherFilters]);

  const activeFilterCount = Object.values(selectedFilters).filter(Boolean).length;

  const priorityStyles = {
    High: "bg-app-error/10 text-app-error",
    Medium: "bg-app-warning/10 text-app-warning",
    Low: "bg-app-success/10 text-app-success",
  };

  return (
    <section className="w-full rounded-2xl border border-app-border bg-app-card p-4 shadow-sm sm:p-5">

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-app-text">
            Your Tasks
          </h3>
          <p className="mt-1 text-sm text-app-text-muted">
            Stay organized and keep making progress.
          </p>
        </div>

        <span className="rounded-full bg-brand-surface px-3 py-1.5 text-xs font-semibold text-brand-primary">
          {filteredTasks.length} Tasks
        </span>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">

        <div className="relative flex-1 sm:max-w-56">
          <ArrowUpDown
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted"
          />

          <select
            value={sortBy}
            onClick={() => {
              if (isFilterOpen) {
                setIsFilterOpen(false);
              }
            }}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            className="w-full appearance-none rounded-xl border border-app-border bg-app-card py-2.5 pl-10 pr-9 text-sm font-medium text-app-text outline-none transition-all hover:border-brand-lavender focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
          >
            <option value="" disabled>
              Sort By
            </option>

            <option value="default">Default</option>
            <option value="due-asc">Due Date ↑</option>
            <option value="due-desc">Due Date ↓</option>
            <option value="priority-asc">Priority ↑</option>
            <option value="priority-desc">Priority ↓</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-app-text-muted"
          />
        </div>

        <div className="relative" ref={filterRef}>
          <button
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
              isFilterOpen || activeFilterCount > 0
                ? "border-brand-primary bg-brand-surface text-brand-primary"
                : "border-app-border bg-app-card text-app-text hover:border-brand-lavender"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsFilterOpen(!isFilterOpen);
            }}
          >
            <ListFilter size={16} />
            Filter

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}

            <ChevronDown
              size={15}
              className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full z-30 mt-2 max-h-[70vh] w-64 overflow-y-auto rounded-2xl border border-app-border bg-app-card p-3 shadow-xl">

              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-bold text-app-text">
                  Filter Tasks
                </h4>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-lg p-1 text-app-text-muted transition-colors hover:bg-app-bg hover:text-app-text"
                  aria-label="Close filters"
                >
                  <X size={17} />
                </button>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-app-text-muted">
                Status
              </p>

              {[
                ["active", "Active"],
                ["completed", "Completed"],
                ["starred", "Starred"],
              ].map(([key, label]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-app-text transition-colors hover:bg-brand-surface"
                >
                  <input
                    type="checkbox"
                    onChange={() => toggleFilter(key)}
                    checked={selectedFilters[key]}
                    className="h-4 w-4 accent-brand-primary"
                  />
                  {label}
                </label>
              ))}

              <div className="my-3 border-t border-app-border" />

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-app-text-muted">
                Priority
              </p>

              {[
                ["highPriority", "High Priority"],
                ["mediumPriority", "Medium Priority"],
                ["lowPriority", "Low Priority"],
              ].map(([key, label]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-app-text transition-colors hover:bg-brand-surface"
                >
                  <input
                    type="checkbox"
                    onChange={() => toggleFilter(key)}
                    checked={selectedFilters[key]}
                    className="h-4 w-4 accent-brand-primary"
                  />
                  {label}
                </label>
              ))}

              <div className="my-3 border-t border-app-border" />

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-app-text-muted">
                Due Date
              </p>

              {[
                ["overdue", "Overdue"],
                ["dueToday", "Due Today"],
              ].map(([key, label]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-app-text transition-colors hover:bg-brand-surface"
                >
                  <input
                    type="checkbox"
                    onChange={() => toggleFilter(key)}
                    checked={selectedFilters[key]}
                    className="h-4 w-4 accent-brand-primary"
                  />
                  {label}
                </label>
              ))}

              <div className="my-3 border-t border-app-border" />

              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-surface px-3 py-2 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                onClick={clearFilters}
              >
                <X size={15} />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {Object.entries(selectedFilters)
            .filter(([, value]) => value)
            .map(([key]) => (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                className="flex items-center gap-1.5 rounded-full bg-brand-surface px-3 py-1.5 text-xs font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                {key === "highPriority"
                  ? "High Priority"
                  : key === "mediumPriority"
                    ? "Medium Priority"
                    : key === "lowPriority"
                      ? "Low Priority"
                      : key === "dueToday"
                        ? "Due Today"
                        : key === "overdue"
                          ? "Overdue"
                          : key.charAt(0).toUpperCase() + key.slice(1)}
                <X size={12} />
              </button>
            ))}
        </div>
      )}

      <div className="mb-4 border-t border-app-border" />

      <ul className="space-y-3">
        {filteredBySelectedFilters.length === 0 ? (
          <li className="flex flex-col items-center justify-center rounded-xl border border-dashed border-app-border bg-app-bg px-4 py-12 text-center">
            <div className="mb-3 rounded-2xl bg-brand-surface p-4">
              <CheckCircle2 size={28} className="text-brand-primary" />
            </div>

            <p className="text-sm font-semibold text-app-text">
              {emptyMessage}
            </p>

            <p className="mt-1 text-xs text-app-text-muted">
              Your tasks will appear here.
            </p>
          </li>
        ) : (
          filteredBySelectedFilters.map((elem) => {
            const isOverdue = moment(elem.dueDate).isBefore(moment(), "day");

            const isToday = moment(elem.dueDate).isSame(moment(), "day");

            return (
              <li
                className="group relative rounded-xl border border-app-border bg-app-card p-4 transition-all duration-200 hover:border-brand-lavender hover:shadow-md"
                key={elem.id}
              >
                <div className="mb-3 flex items-center justify-between">
                  <button
                    className={`rounded-lg p-2 transition-colors ${
                      elem.starred
                        ? "bg-app-warning/10 text-app-warning"
                        : "text-app-text-muted hover:bg-brand-surface hover:text-brand-primary"
                    }`}
                    onClick={() => toggleStar(elem)}
                    aria-label={elem.starred ? "Remove star" : "Star task"}
                  >
                    <Star
                      size={18}
                      fill={elem.starred ? "currentColor" : "none"}
                    />
                  </button>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        priorityStyles[elem.priority] || "bg-app-bg text-app-text-muted"
                      }`}
                    >
                      {elem.priority}
                    </span>

                    <button
                      className="rounded-lg p-2 text-app-text-muted transition-colors hover:bg-app-bg hover:text-app-text"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === elem.id ? null : elem.id);
                      }}
                      aria-label="Task options"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={elem.completed}
                    onChange={() => toggleTask(elem)}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-brand-primary"
                  />

                  <span
                    className={`min-w-0 flex-1 wrap-break-word text-sm font-medium leading-relaxed ${
                      elem.completed
                        ? "text-app-text-muted line-through"
                        : "text-app-text"
                    }`}
                  >
                    {elem.text}
                  </span>
                </div>

                {elem.dueDate && (
                  <div className="mt-3 flex items-center gap-2 pl-7">
                    <CalendarDays
                      size={14}
                      className={
                        isOverdue
                          ? "text-app-error"
                          : isToday
                            ? "text-app-warning"
                            : "text-app-text-muted"
                      }
                    />

                    <span
                      className={`text-xs font-medium ${
                        isOverdue
                          ? "text-app-error"
                          : isToday
                            ? "text-app-warning"
                            : "text-app-text-muted"
                      }`}
                    >
                      {moment(elem.dueDate).format("MMM DD")}
                      {isOverdue && " · Overdue"}
                      {isToday && " · Due today"}
                    </span>
                  </div>
                )}

                {openMenu === elem.id && (
                  <div
                    className="absolute right-4 top-14 z-20 w-36 rounded-xl border border-app-border bg-app-card p-1.5 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-app-text transition-colors hover:bg-brand-surface hover:text-brand-primary"
                      onClick={() => {
                        setIsEditOpen(true);
                        setEditingTask({
                          id: elem.id,
                          text: elem.text,
                          priority: elem.priority,
                        });
                        setOpenMenu(null);
                      }}
                    >
                      <SlidersHorizontal size={15} />
                      Edit
                    </button>

                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-app-error transition-colors hover:bg-app-error/10"
                      onClick={() => {
                        setTaskToDelete(elem.id);
                        setIsDeleteOpen(true);
                        setOpenMenu(null);
                      }}
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })
        )}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-app-border pt-4">
        <p className="text-xs text-app-text-muted">
          {filteredTasks.filter((task) => task.completed).length} completed
          {" "}out of {filteredTasks.length} tasks
        </p>

        <button
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-app-error transition-colors hover:bg-app-error/10"
          onClick={clearCompletedTasks}
        >
          <Trash2 size={15} />
          Clear Completed
        </button>
      </div>
    </section>
  );
}

export default React.memo(TasksBoard);
