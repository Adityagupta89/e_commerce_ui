import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Stack } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/cartSlice";
import { IconButton } from "@mui/material";
import { Divider } from "@mui/material";

const ProductCart = (props) => {
  const dispatch = useDispatch();
  let image;
  if (props.product.product_image?.length === 1)
    image = [`${process.env.REACT_APP_URL}${props.product.product_image}`];
  else {
    image = "data:image/png;base64," + props.product.product_image[0];
  }

  const addProductHandler = () => {
    dispatch(cartAction.addProduct({ product: props.product, size: 1 }));
  };

  const removeProductHandler = () => {
    dispatch(cartAction.removeProduct({ id: props.product._id }));
  };

  return (
    <>
      <Grid container sx={{ maxWidth: "100%", p: "2rem" }}>
        <Stack sx={{ width: "100%", flexDirection: "row" }}>
          <Stack sx={{ width: "50%", height: "100%" }}>
            <img
              src={image}
              alt="green iguana"
              style={{
                width: "85%",
                backgroundSize: "auto",
                height: "250px",
              }}
            />
          </Stack>
          <Stack sx={{ justifyContent: "space-between", width: "50%" }}>
            <Typography gutterBottom variant="h5" component="div">
              {props.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.product.description}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Qty : {props.product.size}
              <IconButton aria-label="share" onClick={addProductHandler}>
                <AddIcon
                  sx={{
                    border: "1px solid black",
                    borderRadius: "1rem",
                    ml: ".5rem",
                  }}
                />
              </IconButton>
              <IconButton aria-label="share" onClick={removeProductHandler}>
                <RemoveIcon
                  sx={{ border: "1px solid black", borderRadius: "1rem" }}
                />
              </IconButton>
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Price : {props.product.price}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Divider />
    </>
  );
};

export default ProductCart;
