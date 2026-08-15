import React, { useState } from "react";
import "./ListInputModal.css";

function ListInputModal({ isOpen, onClose, onCreateList }) {
  const [listName, setListName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="input-overlay" onClick={onClose}>
      <div className="input-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create New List</h2>

        <p>Organize your tasks into a new category.</p>

        <input
          type="text"
          placeholder="Enter list name..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCreateList(listName);
            }
          }}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="create-btn" onClick={() => onCreateList(listName)}>
            Create List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListInputModal;
