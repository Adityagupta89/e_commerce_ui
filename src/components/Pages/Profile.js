import React from "react";
import { Box, Container } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastCSS from "../../helper/ToastMessage";
import ToastContainers from "../../helper/ToastContainer";
import axios from "axios";
import { Button } from "@mui/material";
import { useState } from "react";
import { Chip } from "@mui/material";
import { Divider } from "@mui/material";
import PasswordForm from "../UI/PasswordForm";
import classes from "./Profile.module.css";
import { useRef } from "react";
import profile1 from "../../images/profile1.png";
import { useSelector } from "react-redux";
import AddressForm from "../UI/AddressForm";
import Header from "../UI/Header";

const Profile = (props) => {
  const admin = useSelector((state) => state.auth.isAdmin);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    mobile_no: 0,
    password: "",
    user_image: "",
    _id: "",
    address_info: [
      {
        address1: "",
        address2: "",
        landmark: "",
        city: "",
        pincode: 0,
      },
    ],
    dob: "",
  });
  const [file, setFile] = useState();
  const user_id = localStorage.getItem("user_id");

  const updateAddress = (value) => {
    setUpdate(value);
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressChange = (e) => {
    const id = e.target.id;
    const name = e.target.name;
    setUser((prev) => {
      const address_info = prev.address_info.map((address) => {
        if (address._id === id)
          return {
            ...address,
            [name]: e.target.value,
          };
        else return address;
      });
      return {
        ...prev,
        address_info: address_info,
      };
    });
  };

  const handlePrimaryAddress = (e) => {
    const id = e.target.id;
    if (!e.target.value) return;
    setUser((prev) => {
      const address_info = prev.address_info.map((address) => {
        if (address._id === id)
          return {
            ...address,
            primary: true,
          };
        else
          return {
            ...address,
            primary: false,
          };
      });
      return {
        ...prev,
        address_info: address_info,
      };
    });
  };

  const values = {
    someDate: new Date(user.dob).toLocaleDateString("en-CA"),
  };

  const inputFile = useRef(null);
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setFile(fileObj);
  };

  const onButtonClick = async () => {
    inputFile.current.click();
  };

  useEffect(() => {
    const updateFile = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("profileImage", file);
        await axios
          .put(`${process.env.REACT_APP_USER_URL}${user_id}`, formData)
          .then((res) => {
            if (res.data.status === 400) toast.info(res.data.msg, ToastCSS);
            if (res.data.status === 200) {
              setUser(res.data.data);
              toast.info("Image Updated", ToastCSS);
            }
          })
          .catch((err) => toast.info(err.response.data.msg, ToastCSS));
      }
    };
    updateFile();
  }, [file, user_id]);

  useEffect(() => {
    if (user_id) {
      fetch(`${process.env.REACT_APP_USER_URL}${user_id}`)
        .then((res) => res.json())
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [update, user_id]);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3020/api/user/${user_id}`, user)
      .then((res) => {
        if (res.status === 400) toast.info(res.data.msg, ToastCSS);
        if (res.status === 404) toast.info(res.data.msg, ToastCSS);
        if (res.status === 200) {
          toast.info(res.data.msg, ToastCSS);
        }
      })
      .catch((err) => toast.info(err.response.data.msg, ToastCSS));
  };

  return (
    <>
      <Header search={props.search} />
      <ToastContainers />
      <Box sx={{ height: "20vh", backgroundColor: "#e5e8ed" }}>
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100vw",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ width: "55%", fontSize: "1.4rem" }}
          >
            <PersonIcon /> {`${user?.first_name} ${user?.last_name}`}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ width: "55%", fontSize: "1.4rem" }}
          >
            <EmailIcon /> {`${user?.email}`}
          </Typography>
          <div className={classes.box} onClick={onButtonClick}>
            <input
              type="file"
              id="file"
              ref={inputFile}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {admin === "true" && (
              <img className={classes.box1} src={profile1} alt="" />
            )}
            {admin !== "true" && (
              <img
                className={classes.box1}
                src={"http://localhost:3020/" + user.user_image}
                alt="empty"
              />
            )}
          </div>
        </Stack>
      </Box>
      <Container sx={{ marginTop: "5rem" }}>
        <Grid spacing={2} container sx={{ justifyContent: "center" }}>
          <Stack sx={{ width: "60%" }}>
            {user.mobile_no !== 0 ? (
              <form onSubmit={submitHandler}>
                <Grid
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                  >
                    First Name
                  </Typography>
                  <TextField
                    id="outlined-basic1"
                    name="first_name"
                    defaultValue={`${user?.first_name}`}
                    variant="outlined"
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                  >
                    last Name
                  </Typography>
                  <TextField
                    id="outlined-basic2"
                    name="last_name"
                    defaultValue={`${user?.last_name}`}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                  >
                    Mobile Number
                  </Typography>
                  <TextField
                    id="outlined-basic5"
                    name="mobile_no"
                    value={String(user?.mobile_no)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                {user?.address_info?.map((address, index) => {
                  return (
                    <Box key={index}>
                      <Divider>
                        <Chip label="Address" />
                      </Divider>
                      <Grid
                        sx={{
                          mb: 2,
                          mt: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                        >
                          Address 1
                        </Typography>
                        <TextField
                          name="address1"
                          type="text"
                          id={address._id}
                          defaultValue={address.address1}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                        >
                          Address 2
                        </Typography>
                        <TextField
                          name="address2"
                          id={address._id}
                          type="text"
                          onChange={handleAddressChange}
                          defaultValue={address.address2}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      </Grid>

                      <Grid
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                        >
                          Landmark
                        </Typography>
                        <TextField
                          id={address._id}
                          name="landmark"
                          type="text"
                          defaultValue={address.landmark}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      </Grid>

                      <Grid
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                        >
                          City
                        </Typography>
                        <TextField
                          name="city"
                          id={address._id}
                          type="text"
                          defaultValue={address.city}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                        >
                          Pincode
                        </Typography>
                        <TextField
                          name="pincode"
                          id={address._id}
                          defaultValue={String(address.pincode)}
                          onChange={handleAddressChange}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ width: "25%", textAlign: "center", mr: "2rem" }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={address.primary}
                                onChange={handlePrimaryAddress}
                                id={address._id}
                              />
                            }
                            label="Primary Address"
                            checked={true}
                          />
                        </FormGroup>
                      </Typography>
                    </Box>
                  );
                })}
                <Divider />
                <Grid
                  sx={{
                    mb: 2,
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ width: "20%", textAlign: "center", mr: "2rem" }}
                  >
                    DOB
                  </Typography>
                  <TextField
                    id="outlined-basic11"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true, required: true }}
                    value={values.someDate}
                    fullWidth
                  />
                </Grid>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{ width: "80%" }}
                >
                  <Button
                    type="Submit"
                    color="primary"
                    sx={{
                      mr: "1.3rem",
                      height: "35px",
                      mt: ".7rem",
                      width: "80px",
                    }}
                    variant="contained"
                  >
                    Update
                  </Button>
                  <PasswordForm email={user?.email} />
                </Stack>
              </form>
            ) : (
              <></>
            )}
            {admin !== "true" && (
              <Stack
                style={{}}
                alignItems="end"
                sx={{ position: "relative", bottom: "38px", width: "40%" }}
              >
                <AddressForm email={user?.email} update={updateAddress} />
              </Stack>
            )}
          </Stack>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
