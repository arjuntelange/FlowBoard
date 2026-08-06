import React, { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import "./TasksBoard.css";
import { Star, MoreVertical, Trash2 } from "lucide-react";

function TasksBoard({
  filteredTasks,
  filter,
  emptyMessage,
  toggleTask,
  toggleStar,
  deleteTask,
  handleFilter,
  clearCompletedTasks,
  isEditOpen,
  setIsEditOpen,
  editingTask,
  setEditingTask,
  setTaskToDelete,
  setIsDeleteOpen,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    function closeMenu() {
      setOpenMenu(null);
    }

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <section className="tasks-container">
      <div className="filter-section">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => handleFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => handleFilter("completed")}
        >
          Completed
        </button>
      </div>

      <hr />

      <ul>
        {filteredTasks.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          filteredTasks.map((elem) => (
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
                  📅 {moment(elem.dueDate).format("MMM DD")}
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
          ))
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
