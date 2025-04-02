import React, { createContext, useContext, useMemo } from "react";
import { notification } from "antd";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = useMemo(() => {
    return {
      success: ({ message, description, placement = "bottomLeft" }) =>
        api.success({ message, description, placement }),
      info: ({ message, description, placement = "bottomLeft" }) =>
        api.info({ message, description, placement }),
      warning: ({ message, description, placement = "bottomLeft" }) =>
        api.warning({ message, description, placement }),
      error: ({ message, description, placement = "bottomLeft" }) =>
        api.error({ message, description, placement }),
    };
  }, [api]);

  return (
    <NotificationContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
