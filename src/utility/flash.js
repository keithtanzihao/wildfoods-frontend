import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.min.css";

export const flashMessage = (status, title) => {
  return new Notify({
    status,
    title,
    autoclose: true,
    autotimeout: 5000,
    position: "right top",
  });
};
