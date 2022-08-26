import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastContainers=()=>{
    return  <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover
    theme="colored"
  />
}
export default ToastContainers
