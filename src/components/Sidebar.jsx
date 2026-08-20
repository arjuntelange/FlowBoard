import React, { useState } from "react";
import {
  Rocket,
  ListTodo,
  Star,
  Smile,
  Plus,
  User,
  FolderOpen,
  LayoutDashboard,
  House,
  ClipboardCheck,
  EllipsisVertical,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({
  lists,
  selectedList,
  setSelectedList,
  setList,
  isInputOpen,
  setIsInputOpen,
  isListEditOpen,
  setIsListEditOpen,
  setEditingList,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>
          <Rocket size={28} />
          FlowBoard
        </h2>
        <p>Organize. Prioritize. Achieve.</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li
            className={
              selectedList === "dashboard" ? "active-sidebar-item" : ""
            }
            onClick={() => setSelectedList("dashboard")}
          >
            <House size={18} /> DashBoard
          </li>

          <li
            className={selectedList === "all" ? "active-sidebar-item" : ""}
            onClick={() => setSelectedList("all")}
          >
            <ListTodo size={18} />
            All Tasks
          </li>

          <li
            className={selectedList === "starred" ? "active-sidebar-item" : ""}
            onClick={() => setSelectedList("starred")}
          >
            <Star size={18} />
            Important
          </li>

          <li
            className={
              selectedList === "completed" ? "active-sidebar-item" : ""
            }
            onClick={() => setSelectedList("completed")}
          >
            <ClipboardCheck size={18} />
            Completed
          </li>
        </ul>
      </nav>

      <hr />

      <div className="sidebar-tasks">
        <h3>Tasks</h3>

        <ul>
          {lists.map((list) => (
            <div key={list.id} className="list-wrapper">
              <li
                className={
                  selectedList.id === list.id ? "active-sidebar-item" : ""
                }
                key={list.id}
                onClick={() =>
                  setSelectedList({
                    id: list.id,
                    name: list.name,
                  })
                }
              >
                {list.name}
                <button
                  className="list-menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === list.id ? null : list.id);
                  }}
                >
                  <EllipsisVertical size={16} />
                </button>
              </li>

              {openMenuId === list.id && (
                <div className="list-dropdown">
                  <button
                    onClick={() => {
                      setEditingList(list)
                      setIsListEditOpen(true);
                      setOpenMenuId(null);
                    }}
                  >
                    Edit
                  </button>
                  <button>Delete</button>
                </div>
              )}
            </div>
          ))}
        </ul>

        <button onClick={() => setIsInputOpen(true)}>
          <Plus size={18} />
          New List
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
