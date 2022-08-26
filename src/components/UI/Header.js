import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import classes from "./Header.module.css";
import { authAction } from "../redux/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Chip } from "@mui/material";

const Header = (props) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.product);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const numberOfCartItems = products.length;
  const login = useSelector((state) => state.auth.isLogin);
  const admin=useSelector((state) => state.auth.isAdmin);
  const buttonHandle = () => {
    dispatch(authAction.admin({ value: false }));
    dispatch(authAction.logout());
    localStorage.removeItem("user_id");
    localStorage.removeItem("islogin");
    localStorage.removeItem("isadmin");
    navigate("/login");
  };
  props.search(search);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" sx={{ width: "40%" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Product</Button>
          </Link>
          {login && (
            <Link
              to={`/order/${user_id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Order</Button>
            </Link>
          )}
        </Stack>
        <div className={classes.search}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ width: "100%" }}
          >
            <Search
              className={classes.box3}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "50%" }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search By Name"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {!login && (
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Box
                  sx={{
                    border: "0px solid black",
                    m: "1rem",
                    width: "60px",
                    height: "41px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#4089d3",
                  }}
                >
                  Login
                </Box>
              </Link>
            )}
            {login && (
              <Link to="/profile">
                <AccountCircleIcon
                  sx={{
                    fontSize: "2rem",
                    ml: "10px",
                    mr: "10px",
                    mt: "4px",
                    color: "#e7e2e2",
                  }}
                />
              </Link>
            )}
           {admin==='false' && <div className={classes.chip}>
              <Box
                sx={{
                  backgroundColor: "#165ba0",
                  borderRadius: "20px",
                  width: "100%",
                  p: "5px",
                }}
              >
                <Link
                  to="/cart/"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <ShoppingCartIcon
                    sx={{
                      fontSize: "1.8rem",
                      textAlign: "center",
                      color: "#e7e2e2",
                    }}
                  />
                  <Chip
                    label={numberOfCartItems}
                    sx={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      backgroundColor: "#1c6cbb",
                    }}
                  />
                </Link>
              </Box>
           
            </div> }
            {login && (
              <LogoutIcon
                onClick={buttonHandle}
                sx={{ cursor: "pointer", fontSize: "2rem" }}
              />
            )}
          </Stack>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default Header;
