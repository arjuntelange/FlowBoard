import { AlertTriangle, Trash2 } from "lucide-react";

function DeleteConfirm({ isOpen, onClose, onConfirm }) {
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
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-app-error">
          <Trash2 size={30} />
        </div>

        <h2 className="text-xl font-bold text-app-text">
          Delete Task?
        </h2>

        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-app-text-muted">
          This task will be permanently removed. This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm font-semibold text-app-text transition hover:bg-brand-surface"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-app-error px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
          >
            <Trash2 size={16} />
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;