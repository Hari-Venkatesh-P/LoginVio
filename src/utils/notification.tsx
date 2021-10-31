import { store } from "react-notifications-component";

export type NotificationType =
  | "success"
  | "danger"
  | "info"
  | "default"
  | "warning"
  | undefined;

export const createNotification = (
  title: string,
  message: string,
  type: NotificationType
) => {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeInRight"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 3000, showIcon: true },
  });
};
