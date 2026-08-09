import React, { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import "./TasksBoard.css";
import { Star, MoreVertical, Trash2, LockKeyhole } from "lucide-react";

function TasksBoard({
  filteredTasks,
  filter,
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

  const [filterBy, setFilterBy] = useState("all");

  const processedTasks = [...filteredTasks];

  const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  useEffect(() => {
    function closeMenu() {
      setOpenMenu(null);
    }

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  switch (sortBy) {
    case "due-asc":
      processedTasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return (
          moment(a.dueDate, "DD-MM-YYYY") - moment(b.dueDate, "DD-MM-YYYY")
        );
      });
      break;

    case "due-desc":
      processedTasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return (
          moment(b.dueDate, "DD-MM-YYYY") - moment(a.dueDate, "DD-MM-YYYY")
        );
      });
      break;

    case "priority-asc":
      processedTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
      break;

    case "priority-desc":
      processedTasks.sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
      );
      break;

    case "az":
      processedTasks.sort((a, b) => {
        return a.text.localeCompare(b.text);
      });
      break;

    case "za":
      processedTasks.sort((a, b) => {
        return b.text.localeCompare(a.text);
      });
      break;

    default:
      break;
  }

  return (
    <section className="tasks-container">
      <div className="filter-section">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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

        <select defaultValue="">
          <option value="" disabled>
            Filter
          </option>

          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="starred">Starred</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
          <option value="overdue">Overdue</option>
          <option value="today">Due Today</option>
        </select>
      </div>

      <hr />

      <ul>
        {processedTasks.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          processedTasks.map((elem) => {
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

export default TasksBoard;
