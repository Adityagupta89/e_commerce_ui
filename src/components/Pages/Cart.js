import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Stack, Box, Container } from "@mui/material";
import ProductCart from "../UI/ProductCart";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { cartAction } from "../redux/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import Header from "../UI/Header";

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.product);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [userAddress, setUserAddress] = useState({});
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const login = useSelector((state) => state.auth.isLogin);
  const empty_Cart = (
    <Typography variant="h2" component="div" sx={{ textAlign: "center" }}>
      Product Cart is Empty
    </Typography>
  );

  const orderHandler = () => {
    if (login !== "true") {
      navigate("/login");
      return;
    }
    try {
      products.forEach((element) => {
        createOrder(element);
      });
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setTimeout(() => {
      dispatch(cartAction.clearCart());
      navigate("/");
    }, 2000);
    toast.info("Order Place", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const createOrder = async (product) => {
    const data = {
      user_id: user_id,
      product_id: product?._id,
      amount: product?.price,
      address_info: userAddress[0],
    };

    await fetch("http://localhost:3020/api/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user_id !== null)
      fetch(`http://localhost:3020/api/user/${user_id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setUserAddress((prev) => {
              return res.data.address_info.filter(
                (address) => address.primary === true
              );
            });
          }
        })
        .catch((err) => console.log(err));
  }, [user_id]);

  return (
    <div className={classes.body}>
      <Header search={props.search} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <Container sx={{ width: "100vw" }}>
        {products.length === 0 && empty_Cart}
        {products.length > 0 && (
          <>
            <Grid container sx={{ mt: "2rem" }}>
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  m: "3rem",
                  boxShadow:
                    "0px 2px 19px 5px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                }}
              >
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ mt: "2rem", ml: "2rem" }}
                >
                  Cart ({products.length} items)
                </Typography>
                {products.map((product) => (
                  <ProductCart key={product._id} product={product} />
                ))}
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                sx={{
                  height: "300px",
                  mt: "3rem",
                  boxShadow:
                    "0px 2px 19px 5px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="span"
                  sx={{ ml: "1rem" }}
                >
                  The Total Amount Of
                </Typography>
                <Grid container sx={{ mt: "2rem", mb: "1rem" }}>
                  <Grid xs={6} item sx={{ height: "75px" }}>
                    <Stack
                      direction="column"
                      justifyContent="space-around"
                      sx={{ height: "100%", ml: "1rem" }}
                    >
                      <Box>Product Amount</Box>
                      <Box>Shipping Charge</Box>
                    </Stack>
                  </Grid>
                  <Grid xs={6} sx={{ height: "75px" }} item>
                    <Stack
                      direction="column"
                      alignItems="flex-end"
                      justifyContent="space-around"
                      sx={{ height: "100%", mr: "1rem" }}
                    >
                      <Box>{totalAmount}</Box>
                      <Box>50</Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Divider />
                <Typography
                  sx={{
                    mt: "1rem",
                    ml: "1rem",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <span style={{ width: "80%" }}>
                    {" "}
                    The Total Amount of Product
                  </span>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "12%",
                    }}
                  >
                    {totalAmount + 50}
                  </span>
                </Typography>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={orderHandler}
                  sx={{ m: "1.5rem" }}
                >
                  Checkout
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default Cart;
