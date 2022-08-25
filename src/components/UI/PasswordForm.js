import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastCSS from "../../helper/ToastMessage";
import ToastContainers from "../../helper/ToastContainer";
import axios from "axios";
import { useState } from "react";


const PasswordForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    const data = {
      email: props.email,
      oldpassword: oldPassword,
      newpassword: newPassword,
    };
    axios
      .put(`http://localhost:3020/api/user/changePassword`, data)
      .then((res) => {
        if (res.status === 400) toast.info(res.data.msg,ToastCSS);
        if (res.status === 404) toast.info(res.data.msg,ToastCSS);
        if (res.status === 200) {
          setTimeout(() => {
            setOpen(false);
          }, 2000);
          toast.info(res.data.msg,ToastCSS);
        }
      })
      .catch((err) => toast.info(err.response.data.msg,ToastCSS));
  };

  return (
    <div>
      <ToastContainers/>
      <Button
        variant="contained"
        sx={{ mt: ".7rem" }}
        onClick={handleClickOpen}
      >
        Edit Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Password</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: ".7rem" }}>
            Please Enter Old password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            onChange={(e) => setOldPassword(e.target.value)}
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
            sx={{ width: "20vw" }}
          />
          <DialogContentText sx={{ mt: "1rem" }}>
            Please Enter New password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={(e) => setNewPassword(e.target.value)}
            id="password1"
            label="Password"
            type="password"
            fullWidth
            required
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={submitHandler}
            color="primary"
            variant="contained"
            disabled={!oldPassword || !newPassword}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default PasswordForm;
