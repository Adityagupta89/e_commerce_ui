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

const EmailForm = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const data = {
      email: email,
    };
    axios
      .post(`http://localhost:3020/api/mail/`, data)
      .then((res) => {
        if (res.status === 400) toast.info(res.data.msg,ToastCSS);
        if (res.status === 200) {
          setTimeout(() => {
            setOpen(false);
          }, 2000);
          toast.info(res.data.msg,ToastCSS);
        }
      })
      .catch((err) => {
        toast(err.response.data.msg);
      });
  };

  return (
    <div>
      <ToastContainers />
      <Button variant="text" sx={{ mt: ".7rem" }} onClick={handleClickOpen}>
        Forgot Password ?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent sx={{ width: "25vw" }}>
          <DialogContentText sx={{ mt: ".7rem" }}>
            Please Enter User Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            required
            sx={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Forgot Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmailForm;
