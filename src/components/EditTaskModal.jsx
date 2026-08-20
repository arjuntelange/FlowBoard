import "./EditTaskModal.css";

function EditTaskModal({
  isOpen,
  onClose,
  editingTask,
  setEditingTask,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>

        <input
          type="text"
          value={editingTask.text}
          onChange={(e) =>
            setEditingTask({
              ...editingTask,
              text: e.target.value,
            })
          }
          className="edit-input"
        />

        <select
          value={editingTask.priority}
          onChange={(e) =>
            setEditingTask({
              ...editingTask,
              priority: e.target.value,
            })
          }
          className="edit-select"
        >
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>

        <div className="edit-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="save-btn" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
