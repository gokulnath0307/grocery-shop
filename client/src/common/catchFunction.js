import { toast } from "react-hot-toast";

const catchFunction = (error) => {
  let errorMessage = "Something went wrong!";

  if (error?.status === "FETCH_ERROR") {
    errorMessage = "Server can't be reached. Please check your internet connection.";
    toast.error(errorMessage);
    return;
  }

  const { status, data } = error.response || error;
  errorMessage = data?.message || error.message || errorMessage;

  if (status >= 500 && status < 600) {
    toast.error(errorMessage || "Internal Server Error! Please try again later.");
  } else if (status >= 400 && status < 500) {
    toast(errorMessage || "Bad Request! Please check your input.", {
      icon: "⚠️",
    });
  } else {
    toast.error(errorMessage);
  }
};

export default catchFunction;
