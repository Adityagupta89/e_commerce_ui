import React from "react";
import { Grid, Paper, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/authSlice";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastCSS from "../../helper/ToastMessage";
import ToastContainers from "../../helper/ToastContainer";
import EmailForm from "../UI/EmailForm";

const paperStyling = { width: "20vw", margin: "10rem auto", padding: "20px" };

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: username,
      password: password,
    };
    login(data);
  };

  const login = async (data) => {
    await fetch("http://localhost:3020/api/auth", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 400) {
         toast.info(res.msg,ToastCSS)
        }
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          dispatch(authAction.setToken({ value: res.data }));
          dispatch(authAction.admin({ value: res.isAdmin }));
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("isadmin", res.isAdmin);
          setTimeout(() => {
            localStorage.setItem("islogin", true);
            dispatch(authAction.login());
            navigate("/");
          }, 2000);
          toast.info(res.msg,ToastCSS);
        }
      });
  };

  return (
    <>
      <ToastContainers/>
      <Grid>
        <Paper elevation={20} style={paperStyling}>
          <Grid align="center">
            <Link to="/">
              <Avatar style={{ backgroundColor: "green" }}>
                <LockOpenOutlinedIcon />
              </Avatar>
            </Link>
            <h2 style={{ marginTop: ".5rem" }}>Login</h2>
          </Grid>
          <form onSubmit={SubmitHandler}>
            <Grid>
              <TextField
                id="standard-basic1"
                sx={{ mt: "1rem" }}
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                variant="standard"
                required
                fullWidth
              />
              <TextField
                id="standard-basic2"
                sx={{ mt: "1.5rem" }}
                label="Password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="standard"
                required
                fullWidth
              />
              <Button
                type="Sumbit"
                color="primary"
                sx={{ mt: "2rem" }}
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </form>
          <EmailForm />
          <Typography sx={{ mt: ".5rem" }}>
            Create a new account ?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
