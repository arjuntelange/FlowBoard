import React from "react";
import "./ListEditModal.css";

function ListEditModal({
  isOpen,
  onClose,
  editingList,
  setEditingList,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="list-edit-overlay">
      <div className="list-edit-modal">
        <h2>Edit List Name</h2>
        <p>Set new name to the list.</p>
        <input
          type="text"
          value={editingList?.name || ""}
          onChange={(e) =>
            setEditingList({ ...editingList, name: e.target.value })
          }
        />

        <div className="list-edit-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default ListEditModal;
