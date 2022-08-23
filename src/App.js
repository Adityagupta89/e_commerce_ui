import React, { useState } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Routes, Route } from "react-router-dom";
import Product from "./components/Pages/Product";
import Home from "./components/Pages/Home";
import AddProduct from "./components/Pages/AddProduct";
import ProtectRoute from "./components/Shared/ProtectRoute";
import Order from "./components/Pages/Order";
import Profile from "./components/Pages/Profile";
import Cart from "./components/Pages/Cart";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const [search, setSearch] = useState("");
  const admin = useSelector((state) => state.auth.isAdmin);
  const login = useSelector((state) => state.auth.isLogin);

  const searchHandler = (data) => {
    setSearch(data);
  };
  return (
    <>
      <Routes>
        {!login && <Route path="/login" element={<Login />} />}
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={<Home searchData={search} search={searchHandler} />}
        />
        <Route
          path="/product/:id"
          element={<Product search={searchHandler} />}
        />
        <Route path="/cart/" element={<Cart search={searchHandler} />} />

        <Route element={<ProtectRoute />}>
          <Route path="/profile" element={<Profile search={searchHandler} />} />

          <Route
            path="/order/:id"
            element={<Order searchData={search} search={searchHandler} />}
          />

          {admin === "true" && (
            <Route
              path="/product/"
              element={<AddProduct page="add" search={searchHandler} />}
            />
          )}
          {admin === "true" && (
            <Route
              path="/product/edit/:id"
              element={<AddProduct page="edit" search={searchHandler} />}
            />
          )}
        </Route>
        <Route path={"*"} element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
