import { useCallback, useRef, useState } from "react";

function useNotification() {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "",
  });

  const timerRef = useRef(null);

  const showNotification = useCallback((title, message, type) => {
    setNotification({
      title,
      message,
      type,
    });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setNotification({
        title: "",
        message: "",
        type: "",
      });
    }, 3500);
  }, []);

  return [
    notification,
    showNotification,
  ];
}

export default useNotification;
