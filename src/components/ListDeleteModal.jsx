import { AlertTriangle, Trash2 } from "lucide-react";

function ListDeleteModal({ isOpen, onClose, listToDelete, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-deep/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-app-border bg-app-card p-7 shadow-2xl">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-app-error">
          <AlertTriangle size={30} />
        </div>

        <h2 className="text-center text-xl font-bold text-app-text">
          Delete List?
        </h2>

        <p className="mt-3 text-center text-sm leading-relaxed text-app-text-muted">
          Are you sure you want to delete
          <strong className="text-app-text">
            {" "}{listToDelete?.name}
          </strong>?
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-app-error">
          <AlertTriangle size={17} className="mt-0.5 shrink-0" />

          <p>
            All tasks inside this list will also be deleted.
          </p>
        </div>

        <div className="mt-7 flex gap-3">
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
            Delete List
          </button>
        </div>

      </div>
    </div>
  );
}

export default ListDeleteModal;