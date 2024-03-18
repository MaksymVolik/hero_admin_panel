import { toast } from "react-toastify";

export const errMsg = (error) => {
  if (error.status === "FETCH_ERROR") {
    toast.error(error.error, {
      position: "top-right",
    });
  } else {
    if (Array.isArray(error.data.error)) {
      error.data.error.forEach((el) =>
        toast.error(el.message, {
          position: "top-right",
        })
      );
    } else {
      toast.error(error.data.message, {
        position: "top-right",
      });
    }
  }
};
