import { useState } from "react";
import {
  Rocket,
  ListTodo,
  Star,
  Plus,
  House,
  ClipboardCheck,
  EllipsisVertical,
} from "lucide-react";

function Sidebar({
  lists,
  selectedList,
  setSelectedList,
  setIsInputOpen,
  setIsListEditOpen,
  setEditingList,
  setIsListDeleteOpen,
  setListToDelete,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col overflow-hidden bg-brand-deep px-5 py-6 shadow-lg">
      <div className="mb-8">
        <h2 className="flex items-center gap-3 text-[2rem] text-shadow-lg font-extrabold text-white">
          <Rocket size={28} />
          FlowBoard
        </h2>

        <p className="mt-2 text-sm text-white/70 text-shadow-md">
          Organize. Prioritize. Achieve.
        </p>
      </div>

      <nav>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">
          Main
        </p>

        <ul className="space-y-2">
          <li
            onClick={() => setSelectedList("dashboard")}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2 mb-2 transition-all duration-200 ${
              selectedList === "dashboard"
                ? "bg-brand-lavender font-semibold text-flowboard-purple"
                : "text-white/80 hover:bg-brand-hover"
            }`}
          >
            <House size={18} />
            Dashboard
          </li>

          <li
            onClick={() => setSelectedList("all")}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2 mb-2 transition-all duration-200 ${
              selectedList === "all"
                ? "bg-brand-lavender font-semibold text-flowboard-purple"
                : "text-white/80 hover:bg-brand-hover"
            }`}
          >
            <ListTodo size={18} />
            All Tasks
          </li>

          <li
            onClick={() => setSelectedList("starred")}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2 mb-2 transition-all duration-200 ${
              selectedList === "starred"
                ? "bg-brand-lavender font-semibold text-flowboard-purple"
                : "text-white/80 hover:bg-brand-hover"
            }`}
          >
            <Star size={18} />
            Important
          </li>

          <li
            onClick={() => setSelectedList("completed")}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2 mb-2 transition-all duration-200 ${
              selectedList === "completed"
                ? "bg-brand-lavender font-semibold text-flowboard-purple"
                : "text-white/80 hover:bg-brand-hover"
            }`}
          >
            <ClipboardCheck size={18} />
            Completed
          </li>
        </ul>
      </nav>

      <div className="my-6 h-px bg-white/10" />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">
          Lists
        </p>

        <ul className="space-y-2">
          {lists.map((list) => (
            <div key={list.id} className="relative">
              <li
                onClick={() =>
                  setSelectedList({
                    id: list.id,
                    name: list.name,
                  })
                }
                className={`group flex cursor-pointer items-center justify-between rounded-xl px-4 py-2 mb-2 transition-all duration-200 ${
                  selectedList.id === list.id
                    ? "bg-brand-lavender font-semibold text-flowboard-purple"
                    : "text-white/80 hover:bg-brand-hover"
                }`}
              >
                <span>{list.name}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === list.id ? null : list.id);
                  }}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <EllipsisVertical size={16} />
                </button>
              </li>

              {openMenuId === list.id && (
                <div className="absolute right-0 top-12 z-50 w-32 rounded-xl bg-brand-secondary p-2 shadow-xl space-y-1">
                  <button
                    onClick={() => {
                      setEditingList(list);
                      setIsListEditOpen(true);
                      setOpenMenuId(null);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-white/50 hover:bg-brand-hover cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setListToDelete(list);
                      setIsListDeleteOpen(true);
                      setOpenMenuId(null);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-white/50 hover:bg-brand-hover cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setIsInputOpen(true)}
        className="mt-4 flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-lavender px-4 py-2 font-semibold text-flowboard-purple cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-2xl"
      >
        <Plus size={18} />
        New List
      </button>
    </aside>
  );
}

export default Sidebar;
