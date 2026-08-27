import React, { useEffect, useMemo, useRef } from "react";
import moment from "moment";
import { useState } from "react";
import "./TasksBoard.css";
import {
  Star,
  MoreVertical,
  Trash2,
  LockKeyhole,
  ChevronDown,
} from "lucide-react";

const priorityOrder = {
  Low: 1,
  Medium: 2,
  High: 3,
};

function TasksBoard({
  filteredTasks,
  filter,
  handleFilter,
  emptyMessage,
  toggleTask,
  toggleStar,
  deleteTask,
  clearCompletedTasks,
  isEditOpen,
  setIsEditOpen,
  editingTask,
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
            moment(a.dueDate, "DD-MM-YYYY") - moment(b.dueDate, "DD-MM-YYYY")
          );
        });
        break;

      case "due-desc":
        taskCopy.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return (
            moment(b.dueDate, "DD-MM-YYYY") - moment(a.dueDate, "DD-MM-YYYY")
          );
        });
        break;

      case "priority-asc":
        taskCopy.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
        );
        break;

      case "priority-desc":
        taskCopy.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
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

  const { activeFilters, statusFilters, priorityFilters, otherFilters } =
    useMemo(() => {
      const activeFilters = Object.entries(selectedFilters)
        .filter(([, value]) => value)
        .map(([key]) => key);

      const statusFilters = activeFilters.filter(
        (filter) => filter === "active" || filter === "completed",
      );

      const priorityFilters = activeFilters.filter(
        (filter) =>
          filter === "highPriority" ||
          filter === "mediumPriority" ||
          filter === "lowPriority",
      );

      const otherFilters = activeFilters.filter(
        (filter) =>
          filter === "starred" || filter === "overdue" || filter === "dueToday",
      );

      return { activeFilters, statusFilters, priorityFilters, otherFilters };
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

  return (
    <section className="tasks-container">
      <div className="filter-section">
        <div className="sort-dropdown">
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

          <ChevronDown className="sort-icon" size={16} />
        </div>

        <div className="filter-dropdown" ref={filterRef}>
          <button
            className="filter-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsFilterOpen(!isFilterOpen);
            }}
          >
            Filter <ChevronDown size={16} />
          </button>

          {isFilterOpen && (
            <div className="filter-menu">
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("active")}
                  checked={selectedFilters.active}
                />
                Active
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("completed")}
                  checked={selectedFilters.completed}
                />
                Completed
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("starred")}
                  checked={selectedFilters.starred}
                />
                Starred
              </label>

              <hr />

              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("highPriority")}
                  checked={selectedFilters.highPriority}
                />
                High Priority
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("mediumPriority")}
                  checked={selectedFilters.mediumPriority}
                />
                Medium Priority
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("lowPriority")}
                  checked={selectedFilters.lowPriority}
                />
                Low Priority
              </label>

              <hr />

              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("overdue")}
                  checked={selectedFilters.overdue}
                />
                Overdue
              </label>

              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleFilter("dueToday")}
                  checked={selectedFilters.dueToday}
                />
                Due Today
              </label>

              <hr />

              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />

      <ul>
        {filteredBySelectedFilters.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          filteredBySelectedFilters.map((elem) => {
            const isOverdue = moment(elem.dueDate).isBefore(moment(), "day");

            const isToday = moment(elem.dueDate).isSame(moment(), "day");

            return (
              <li className="task-card" key={elem.id}>
                <div className="card-top">
                  <button
                    className={`star-btn ${elem.starred ? "starred" : ""}`}
                    onClick={() => toggleStar(elem)}
                  >
                    <Star
                      size={18}
                      fill={elem.starred ? "currentColor" : "none"}
                    />
                  </button>

                  <div className="card-actions">
                    <span
                      className={`priority-badge priority-${elem.priority.toLowerCase()}`}
                    >
                      {elem.priority}
                    </span>

                    <button
                      className="menu-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === elem.id ? null : elem.id);
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <input
                    type="checkbox"
                    checked={elem.completed}
                    onChange={() => toggleTask(elem)}
                  />

                  <span
                    className={`task-text ${
                      elem.completed ? "completed-task" : ""
                    }`}
                  >
                    {elem.text}
                  </span>
                </div>

                {elem.dueDate && (
                  <div className="card-date">
                    <span
                      className={
                        isOverdue ? "overdue" : isToday ? "due-today" : ""
                      }
                    >
                      📅 {moment(elem.dueDate).format("MMM DD")}
                    </span>
                  </div>
                )}

                {openMenu === elem.id && (
                  <div
                    className="menu-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
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
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setTaskToDelete(elem.id);
                        setIsDeleteOpen(true);
                        setOpenMenu(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })
        )}
      </ul>

      <div className="counter-box">
        <button className="clear-btn" onClick={clearCompletedTasks}>
          🧹Clear Completed
        </button>
      </div>
    </section>
  );
}

export default React.memo(TasksBoard);
