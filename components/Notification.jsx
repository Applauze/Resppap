import { Store } from "react-notifications-component";

const DisplayNotification = (title, message, type, position, duration) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: position,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      onScreen: true,
    },
  });
};

export { DisplayNotification };
