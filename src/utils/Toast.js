import toast from "react-hot-toast";

const toastObj = {
  success(message) {
    toast.success(message);
  },
  error(message) {
    toast.error(message);
  },
};

export default toastObj;
