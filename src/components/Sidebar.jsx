
import { useState } from "react";
import {
  Rocket,
  ListTodo,
  Star,
  Plus,
  House,
  ClipboardCheck,
  EllipsisVertical,
  X,
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
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setOpenMenuId(null);
  };

  const handleNavigation = (value) => {
    setSelectedList(value);
    closeSidebar();
  };

  const isSelected = (value) => selectedList === value;

  return (
    <>
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(18rem,85vw)] shrink-0 flex-col overflow-hidden bg-brand-deep px-5 py-6 shadow-xl transition-transform duration-300 md:relative md:z-auto md:w-72 md:translate-x-0 md:shadow-lg ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-8 flex shrink-0 items-start justify-between">
          <div className="min-w-0">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white sm:text-[2rem]">
              <Rocket size={28} />
              FlowBoard
            </h2>

            <p className="mt-2 text-sm text-white/70">
              Organize. Prioritize. Achieve.
            </p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="shrink-0">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">
            Main
          </p>

          <ul className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", Icon: House },
              { id: "all", label: "All Tasks", Icon: ListTodo },
              { id: "starred", label: "Important", Icon: Star },
              { id: "completed", label: "Completed", Icon: ClipboardCheck },
            ].map(({ id, label, Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => handleNavigation(id)}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-2 text-left transition-all ${
                    isSelected(id)
                      ? "bg-brand-lavender font-semibold text-brand-deep"
                      : "text-white/80 hover:bg-brand-hover"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="my-6 h-px shrink-0 bg-white/10" />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">
            Lists
          </p>

          <ul className="space-y-2">
            {lists.map((list) => (
              <li key={list.id} className="relative">
                <div
                  className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-2 transition-all ${
                    selectedList?.id === list.id
                      ? "bg-brand-lavender font-semibold text-brand-deep"
                      : "text-white/80 hover:bg-brand-hover"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation({
                        id: list.id,
                        name: list.name,
                      })
                    }
                    className="min-w-0 flex-1 truncate text-left"
                  >
                    {list.name}
                  </button>

                  <button
                    type="button"
                    aria-label={`Actions for ${list.name}`}
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === list.id ? null : list.id
                      )
                    }
                    className="ml-2 rounded-lg p-2 text-white/80 transition hover:bg-brand-hover"
                  >
                    <EllipsisVertical size={17} />
                  </button>
                </div>

                {openMenuId === list.id && (
                  <div className="absolute right-0 top-full z-50 mt-1 w-36 space-y-1 rounded-xl bg-brand-secondary p-2 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingList(list);
                        setIsListEditOpen(true);
                        setOpenMenuId(null);
                        closeSidebar();
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-brand-hover"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setListToDelete(list);
                        setIsListDeleteOpen(true);
                        setOpenMenuId(null);
                        closeSidebar();
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-brand-hover"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsInputOpen(true);
            closeSidebar();
          }}
          className="mt-4 flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-lavender px-4 py-3 font-semibold text-brand-deep transition hover:shadow-lg"
        >
          <Plus size={18} />
          New List
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
