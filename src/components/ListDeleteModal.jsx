import "./ListDeleteModal.css";

function ListDeleteModal({ isOpen, onClose, listToDelete, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="list-delete-overlay">
      <div className="list-delete-modal">
        <h2>Delete List</h2>

        <p>
          Are you sure you want to delete
          <strong> {listToDelete?.name}</strong>?
        </p>

        <p className="warning-text">
          All tasks inside this list will also be deleted.
        </p>

        <div className="list-delete-actions">
          <button onClick={onClose}>Cancel</button>

          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ListDeleteModal;
