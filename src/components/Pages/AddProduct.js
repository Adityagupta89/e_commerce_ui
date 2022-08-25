import React from "react";
import { Typography, Grid, Stack, TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../UI/Header";
import ToastCSS from "../../helper/ToastMessage";
import ToastContainers from "../../helper/ToastContainer";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import classes from './AddProduct.module.css'
import Box from "@mui/material/Box";
import { upload } from "@testing-library/user-event/dist/upload";

const AddProduct = (props) => {
  const [product, setProduct] = useState({
    category: "",
    create_date: "",
    description: "",
    name: "",
    price: 0,
    product_image: "",
    quantity: 0,
    weight: 0,
  });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [files, setFiles] = useState();
  const [progressInfos, setProgressInfos] = useState([]);
  const [message, setMessage] = useState([]);
  // const [fileInfos, setFileInfos] = useState([]);
  const [progress, setProgress] = React.useState(0);
  const param = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (props.page === "edit") {
      fetch(`http://localhost:3020/api/product/${param.id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((res) => setProduct(res));
    }
  }, [props.page, param.id, token]);

  const submitHandler = (e) => {
    console.log("Adityar  ");
    e.preventDefault();

    const data = new FormData();
    if (files)
      for (let i = 0; i < files.length; i++) {
        data.append("file2", files[i]);
      }
    if (name) data.append("name", name);
    if (price) data.append("price", price);
    if (weight) data.append("weight", weight);
    if (description) data.append("description", description);
    if (category) data.append("category", category);
    if (quantity) data.append("quantity", quantity);

    {
    }

    if (props.page === "add") createProduct(data);
    else productUpdate(data);
  };

  const createProduct = async (data) => {
    await axios
      .post("http://localhost:3020/api/product", data, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 400) toast.info(res.data.msg, ToastCSS);
        if (res.status === 401) toast.info(res.data.msg, ToastCSS);
        if (res.status === 403) toast.info(res.data.msg, ToastCSS);
        if (res.status === 201) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
          toast.info(res.data.msg, ToastCSS);
        }
      })
      .catch((err) => toast.info(err.response.data.msg, ToastCSS));
  };

  const productUpdate = async (data) => {
    axios
      .put(`http://localhost:3020/api/product/edit/${param.id}`, data, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 400)
          toast.info(res.data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        if (res.status === 401)
          toast.info(res.data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        if (res.status === 403)
          toast.info(res.data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        if (res.status === 200) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
          toast.info(res.data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          console.log(res);
        }
      })
      .catch((err) => toast(err.response.data.msg));
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress === 100 ?100: prevProgress + 10));
    }, 400);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const uploadFiles = (event) => {
    event.preventDefault();
    console.log(files)
    let _progressInfos = [];
    let message_info = [];
    for (let i = 0; i < files?.length; i++) {
      _progressInfos.push({ percentage: 100, fileName: files[i].name });
      message_info.push("Uploaded the file successfully :" + files[i].name);
    }
    setProgress(0)
    setMessage(message_info);
    setProgressInfos(_progressInfos);
  };

  return (
    <>
      <Header search={props.search} />
      <ToastContainers />
      <Typography variant="h3" sx={{ textAlign: "center", mt: "1rem" }}>
        {props.page === "add" ? "Add new Product" : "Edit new Product"}{" "}
      </Typography>
      <Stack sx={{ ml: "3rem" }}>
        <Grid sx={{ height: "10%" }}>
          <Typography variant="h5">
            {props.page === "add"
              ? "Add new properties"
              : "Edit new properties"}{" "}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: ".5rem", color: grey[700], mb: ".1rem" }}
          >
            properties let you define extra product data,such as weight or
            quantity.
          </Typography>
        </Grid>
        <Stack sx={{ justifyContent: "space-evenly" }}>
          {props.page === "add" ||
          (props.page === "edit" && product.weight !== 0) ? (
            <form onSubmit={submitHandler} enctype="multipart/form-data">
              <Grid>
                <Typography variant="h5">Name</Typography>
                <TextField
                  id="outlined-basic"
                  sx={{ width: "50%" }}
                  defaultValue={props.page === "edit" ? product?.name : name}
                  variant="outlined"
                  onChange={(event) => setName(event.target.value)}
                  required={props.page === "add"}
                />
                <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                  Name for Product Name
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h5">Price</Typography>
                <TextField
                  id="outlined-basic"
                  type="number"
                  defaultValue={
                    props.page === "edit"
                      ? String(product?.price)
                      : String(price)
                  }
                  sx={{ width: "50%" }}
                  variant="outlined"
                  required={props.page === "add"}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                  Price for Product{" "}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h5">Weight</Typography>
                <TextField
                  id="outlined-basic"
                  type="number"
                  defaultValue={
                    props.page === "edit"
                      ? String(product?.weight)
                      : String(weight)
                  }
                  sx={{ width: "50%" }}
                  variant="outlined"
                  required={props.page === "add"}
                  onChange={(event) => setWeight(event.target.value)}
                />
                <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                  Weight in gram for Product Item
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h5">Description</Typography>
                <TextField
                  id="outlined-basic"
                  sx={{ width: "50%" }}
                  defaultValue={
                    props.page === "edit" ? product?.description : description
                  }
                  variant="outlined"
                  required={props.page === "add"}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                  Description for Product Item
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h5">Category</Typography>
                <FormControl sx={{ marginTop: "10px", width: "50%" }} fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={
                      props.page === "edit" ? product?.category : category
                    }
                    onChange={(event) => setCategory(event.target.value)}
                    required={props.page === "add"}
                    fullWidth
                  >
                    <MenuItem value="mobile">Mobile</MenuItem>
                    <MenuItem value="laptop">Laptop</MenuItem>
                    <MenuItem value="tablet">Tablet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <Typography variant="h5">Quantity</Typography>
                <TextField
                  id="outlined-basic"
                  sx={{ width: "50%" }}
                  defaultValue={
                    props.page === "edit" ? String(product?.quantity) : quantity
                  }
                  type="number"
                  variant="outlined"
                  required={props.page === "add"}
                  onChange={(event) => setQuantity(event.target.value)}
                />
                <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                  Quantity for Product Item
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="h5">
                  React upload multiple Files
                </Typography>
                <div>
                  {progressInfos &&
                    progressInfos.map((progressInfo, index) => (
                      <div className="mb-2" key={index}>
                        <span>{progressInfo.fileName}</span>
                        <Box sx={{ width: "100%",margin:'.5rem 0' }}>
                          <LinearProgressWithLabel value={progress} sx={{height:'20px',borderRadius:"10px"}} />
                        </Box>
                      </div>
                    ))}
                  <div className="row my-3">
                    <div className="col-8">
                      <label className="btn btn-default p-0">
                        <input type="file" multiple onChange={event => setFiles(event.target.files)} />
                      </label>
                    </div>
                    <div style={{margin:'1rem 0'}}>
                      <button
                        className="btn btn-success btn-sm"
                        disabled={!files}
                        onClick={uploadFiles}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  {message.length > 0 && progress===100 && (
                    <div  className={classes.message}>
                      <ul className={classes.ul}>
                        {message.map((item, i) => {
                          return <li key={i}>{item}</li>;
                        })}
                      </ul>
                    </div>
                  )}
                  <div className="card">
                    {/* <div className="card-header">List of Files</div> */}
                    <ul className="list-group list-group-flush">
                      {/* {files &&
                        files?.map((file, index) => (
                          <li className="list-group-item" key={index}>
                            <a href={file.url}>{file.name}</a>
                          </li>
                        ))} */}
                    </ul>
                  </div>
                </div>
              </Grid>
              <Button
                type="Submit"
                color="primary"
                sx={{ mt: ".5rem", width: "50%" }}
                variant="contained"
              >
                {props.page === "add" ? "Create Product" : "Edit Product"}
              </Button>
            </form>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </>
  );
};
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
export default AddProduct;
