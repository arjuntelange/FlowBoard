import { Pencil, X } from "lucide-react";

function EditTaskModal({
  isOpen,
  onClose,
  editingTask,
  setEditingTask,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-brand-deep/40 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-app-border bg-app-card p-4 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
              <Pencil size={20} />
            </div>

            <h2 className="text-xl font-bold text-app-text">
              Edit Task
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-app-text-muted transition hover:bg-brand-surface hover:text-brand-primary"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-app-text">
              Task Name
            </label>

            <input
              type="text"
              value={editingTask.text}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  text: e.target.value,
                })
              }
              className="w-full rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-text outline-none transition focus:border-brand-lavender focus:ring-4 focus:ring-brand-primary/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-app-text">
              Priority
            </label>

            <select
              value={editingTask.priority}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  priority: e.target.value,
                })
              }
              className="w-full rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-text outline-none focus:border-brand-lavender focus:ring-4 focus:ring-brand-primary/10"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm font-semibold text-app-text transition hover:bg-brand-surface"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="flex-1 rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;