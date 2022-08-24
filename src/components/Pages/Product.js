import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Stack, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import Slider from "react-slick";
import { useState } from "react";
import { Typography } from "@mui/material";
import OrderForm from "../UI/OrderForm";
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/cartSlice";
import Header from "../UI/Header";
import classes from './Product.module.css'

const Product = (props) => {
  const param = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  let image
  if(product.product_image?.length===1)
   image = ["http://localhost:3020/" + product.product_image];
  else{
  image=product.product_image?.map(image=>'data:image/png;base64,'+image)
  }
  console.log(image)
  const addProductHandler = () => {
    dispatch(cartAction.addProduct({ product: product }));
  };

  useEffect(() => {
    fetch(`http://localhost:3020/api/product/${param.id}`, {
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNTIxYTdiM2M3YTY4OGQ2YWE2MTQiLCJpc19BZG1pbiI6dHJ1ZSwiaWF0IjoxNjU4NzM3ODk4fQ.PYgHclewRgYHexzZZ6G2qOmnjSRxTDDbVu6yeYbHpJo",
      },
    })
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }, [param.id]);

  return (
    <>
      <Header search={props.search} />
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} sx={{ width: "48%" }}>
        <Slider {...settings}>
          {image?.map(img =>
          
          <Box sx={{ p: "3em" }}>
            <img
              alt="Not Found"
              src={img}
              style={{
                width: product.category ,
                height: "80vh",
                backgroundSize: "cover",
              }}
            />
            
          </Box>
          )}
          </Slider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              mt: "4em",
              justifyContent: "space-around",
              flexDirection: "column",
              height: "60vh",
              // mr:'2em',
              width: "100%",
            }}
          >
            <Typography variant="h5" color="text.secondary" sx={{}}>
              Category :- {product.category}
            </Typography>
            <Typography variant="h3" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h4" color="text.secondary">
              {product.price}
            </Typography>
            <Stack flexDirection="row" sx={{ width: "75%" }}>
              <Button
                sx={{
                  backgroundColor: "#4c93d8",
                  fontSize: "1.3rem",
                  mr: "2rem",
                }}
                variant="contained"
                onClick={addProductHandler}
              >
                Add to Cart
              </Button>
              <OrderForm url={product._id} price={product.price} />
            </Stack>
            <Typography variant="h3" color="text.secondary">
              <strong style={{ fontSize: "1.5rem" }}> Product Details</strong>
              <Typography sx={{ fontSize: "1.3rem" }}>
                A smartphone has more advanced features, including web browsing,
                software applications and a mobile OS. In turn, a smartphone
                also offers capabilities such as support for biometrics, video
                chatting, digital assistants and much.A smartphone also has the
                ability to support accessories, including Bluetooth headphones,
                power charging cables and extra speakers
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

function RightArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black",color:"black",right:'50px' }}
      onClick={onClick}
    />
  );
}
function LeftArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black",color:"white",left:'35px' }}
      onClick={onClick}
    />
  );
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow:<RightArrow/>,
  prevArrow:<LeftArrow/>
};

export default Product;
