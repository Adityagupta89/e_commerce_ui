import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useState } from "react";
import OrderForm from "./OrderForm";
import { useDispatch } from "react-redux";
import { FormControl } from "@mui/material";

import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { cartAction } from "../redux/cartSlice";
import { useSelector } from "react-redux";

const NoteCard = (props) => {
  const admin = useSelector((state) => state.auth.isAdmin);
  const [option, setOption] = useState(1);
  const dispatch = useDispatch();

  let image
  if(props.product.product_image?.length===1)
   image = ["http://localhost:3020/" + props.product.product_image];
  else{
    image='data:image/png;base64,' + props.product.product_image[0];
  }

  const addProductHandler = () => {
    dispatch(cartAction.addProduct({ product: props.product, size: option }));
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        m: 3,
        boxShadow:
          "0px 2px 19px 5px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <Link
        to={`/product/${props.product._id}`}
        style={{ textDecoration: "none" }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ color: "black" }} aria-label="recipe">
              <SendToMobileIcon />
            </Avatar>
          }
          sx={{ color: "black", fontSize: "20px" }}
          title={props.product.name}
          subheader="September 14, 2016"
        />
      </Link>
      <CardMedia
        style={{ marginLeft: "2rem", width: "80%" }}
        component="img"
        height="300"
        className="img"
        image={image}
        alt="Paella dish"
      />
      <CardContent
        sx={{
          height: props.product.category === "laptop" ? "18vh" : "14vh",
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {props.product.description}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          <strong style={{ fontSize: "1.5rem" }}>Price</strong>{" "}
          {props.product.price}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Qty :
          <FormControl sx={{ ml: "10px" }}>
            <Select
              sx={{ height: "35px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={1}
              onChange={(e) => setOption(e.target.value)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "space-evenly" }}>
        <Button
          sx={{ backgroundColor: "#4c93d8" }}
          variant="contained"
          onClick={addProductHandler}
        >
          Add to Cart
        </Button>
        {admin === "true" && (
          <IconButton aria-label="share">
            <Link to={`/product/edit/${props.product._id}`}>
              <EditIcon />
            </Link>
          </IconButton>
        )}
        <OrderForm
          url={props.product._id}
          price={props.product.price}
          value={true}
        />
      </CardActions>
    </Card>
  );
};

export default NoteCard;
