import "./DeleteConfirm.css";
import { Trash2 } from "lucide-react";

function DeleteConfirm({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="delete-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-icon">
          <Trash2 size={46} />
        </div>

        <h2>Delete Task?</h2>

        <p>
          This task will be permanently removed. This action cannot be undone.
        </p>

        <div className="delete-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="delete-btn" onClick={onConfirm}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
