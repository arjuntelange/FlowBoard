import { useCallback } from "react";

function useListActions(
  showNotification,
  selectedList,
  listToDelete,
  lists,
  setList,
  setIsInputOpen,
  editingList,
  setIsListEditOpen,
  setEditingList,
  setTasks,
  setIsListDeleteOpen,
  setListToDelete,
  setSelectedList,
) {
  const handleCreateList = useCallback(
    (listName) => {
      if (!listName.trim()) {
        showNotification(
          "⚠️ Invalid Name",
          "List name cannot be empty.",
          "error",
        );
        return;
      }

      const duplicate = lists.some(
        (list) => list.name.toLowerCase() === listName.trim().toLowerCase(),
      );

      if (duplicate) {
        showNotification(
          "⚠️ List Already Exists",
          "Choose a different name.",
          "error",
        );
        return;
      }

      setList((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: listName.trim(),
        },
      ]);

      setIsInputOpen(false);

      showNotification(
        "🎉 List Created",
        "New task list added successfully.",
        "success",
      );
    },
    [lists, setList, setIsInputOpen, showNotification],
  );

  const handleEditList = useCallback(() => {
    if (!editingList?.name.trim()) {
      showNotification(
        "⚠️ Invalid List Name",
        "List name cannot be empty.",
        "error",
      );

      return;
    }

    const duplicate = lists.some(
      (list) =>
        list.id !== editingList.id &&
        list.name.trim().toLowerCase() ===
          editingList.name.trim().toLowerCase(),
    );

    if (duplicate) {
      showNotification(
        "⚠️ List Already Exists",
        "Choose a different name.",
        "error",
      );

      return;
    }

    setList((prevList) =>
      prevList.map((list) =>
        list.id === editingList.id
          ? { ...list, name: editingList.name.trim() }
          : list,
      ),
    );

    setIsListEditOpen(false);
    setEditingList(null);

    showNotification(
      "✏️ List Updated",
      "List name updated successfully.",
      "success",
    );
  }, [
    lists,
    editingList,
    setList,
    setEditingList,
    setIsListEditOpen,
    showNotification,
  ]);

  const handleDeleteList = useCallback(() => {
    setList((prev) => prev.filter((list) => list.id !== listToDelete.id));

    setTasks((prev) => prev.filter((task) => task.listId !== listToDelete.id));

    setIsListDeleteOpen(false);

    setListToDelete(null);

    if (selectedList.id === listToDelete.id) {
      setSelectedList("dashboard");
    }

    showNotification(
      "🗑️ List Deleted",
      "The list and all its tasks have been removed.",
      "success",
    );
  }, [
    selectedList,
    listToDelete,
    setTasks,
    setList,
    showNotification,
    setSelectedList,
    setIsListDeleteOpen,
    setListToDelete,
  ]);

  return { handleCreateList, handleEditList, handleDeleteList };
}

export default useListActions;
