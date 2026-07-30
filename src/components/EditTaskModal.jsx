import "./EditTaskModal.css";

function EditTaskModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <h2>Edit Task</h2>

        <input type="text" placeholder="Task name" className="edit-input" />

        <select className="edit-select">
          <option>🟢 Low</option>
          <option>🟡 Medium</option>
          <option>🔴 High</option>
        </select>

        <div className="edit-actions">
          <button className="save-btn">Save</button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
