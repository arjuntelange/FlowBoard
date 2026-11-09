import { useState } from "react";
import { FolderPlus, X } from "lucide-react";

function ListInputModal({ isOpen, onClose, onCreateList }) {
  const [listName, setListName] = useState("");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-deep/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-app-border bg-app-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
              <FolderPlus size={21} />
            </div>

            <h2 className="text-xl font-bold text-app-text">
              Create New List
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-app-text-muted transition hover:bg-brand-surface hover:text-brand-primary"
          >
            <X size={19} />
          </button>
        </div>

        <p className="mb-5 text-sm text-app-text-muted">
          Organize your tasks into a new category.
        </p>

        <input
          type="text"
          placeholder="Enter list name..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCreateList(listName);
              setListName("");
            }
          }}
          className="w-full rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-text outline-none transition placeholder:text-app-text-muted focus:border-brand-lavender focus:ring-4 focus:ring-brand-primary/10"
        />

        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-app-border bg-app-bg px-5 py-3 text-sm font-semibold text-app-text transition hover:bg-brand-surface"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onCreateList(listName);
              setListName("");
            }}
            className="flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover active:scale-[0.98]"
          >
            <FolderPlus size={17} />
            Create List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListInputModal;