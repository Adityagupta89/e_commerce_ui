import React from "react";
import { Grid, Paper, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastCSS from "../../helper/ToastMessage";
import ToastContainers from "../../helper/ToastContainer";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState();
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formObjectData = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      mobile_no: mob,
      address1: address1,
      address2: address2,
      city: city,
      landmark: landmark,
      pincode: +pincode,
      profileImage:file,
      dob: date,
    };
    const formData = new FormData();
    for(let key in formObjectData )
    formData.append(key, formObjectData[key]);
    await axios
      .post("http://localhost:3020/api/user", formData)
      .then((res) => {
        console.log(res);
        if (res.data.status === 400) toast.info(res.data.msg, ToastCSS);
        if (res.data.status === 201) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          toast.info(res.data.msg, ToastCSS);
        }
      })
      .catch((err) => toast.info(err.response.data.msg, ToastCSS));
  };

  return (
    <>
      <ToastContainers />
      <Grid>
        <Paper elevation={10} style={paperStyling}>
          <Grid align="center" sx={{ mb: "1rem" }}>
            <Avatar style={{ backgroundColor: "green" }}>
              <LockOpenIcon />
            </Avatar>
            <h2>Signup</h2>
          </Grid>
          <form onSubmit={submitHandler}>
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic1"
                  label="First Name"
                  placeholder="First Name"
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic2"
                  label="Last Name"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic3"
                label="Email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                type="email"
                fullWidth
              />
            </Grid>
            <Grid sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic4"
                label="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                type="password"
                fullWidth
              />
            </Grid>
            <Grid sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic5"
                label="Mobile-No"
                placeholder="Mobile Number"
                onChange={(e) => setMob(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                type="number"
                fullWidth
              />
            </Grid>
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic6"
                  label="address1"
                  placeholder="Address1"
                  onChange={(e) => setAddress1(e.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic7"
                  label="address2"
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="Address2"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-basic8"
                  label="Landmark"
                  placeholder="Landmark"
                  onChange={(e) => setLandmark(e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-basic9"
                  label="City"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-basic10"
                  label="Pincode"
                  placeholder="Pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  type="number"
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
            <Grid sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic11"
                label="DOB"
                placeholder="DOB"
                variant="outlined"
                onChange={(e) => setDate(e.target.value)}
                required
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ mr: "1rem" }}>
                Profile Image
              </Typography>
              <input
                id="outlined-basic12"
                label="File"
                onChange={(event) => setFile(event.target.files[0])}
                required
                type="file"
              />
            </Grid>
            <Button
              type="Submit"
              color="primary"
              sx={{ mt: ".5rem" }}
              variant="contained"
              fullWidth
            >
              Sign Up
            </Button>
          </form>
          <Typography sx={{ mt: "2rem" }}>
            Do you have an account ? <Link to="/login">Log In</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

const paperStyling = {
  width: "25vw",
  // height: "70vh",
  margin: "3rem auto",
  padding: "2rem",
};

export default Signup;
