import React from "react";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import NoteCard from "../UI/NoteCard";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import classes from "./Home.module.css";
import { useMemo } from "react";
import Header from "../UI/Header";

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("mobile");
  let [page, setPage] = useState(1);
  const admin = useSelector((state) => state.auth.isAdmin);
  const [maxPage, setMaxpage] = useState(0);
  const [emptySearch,setEmptySearch]=useState(false)
  // const _DATA = usePagination(products, PER_PAGE);

  const handleChangePagination = (e, p) => {
    if (p === 0) return;
    if (p > maxPage) return;
    setPage(p);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useMemo(() => {
    if (sort === "name") {
      const result = products.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(result);
    }
    if (sort === "price") {
      const result = products.sort((a, b) => +a.price - +b.price);
      setProducts(result);
    }
  }, [sort, products]);

  useEffect(() => {
    fetch(
      `http://localhost:3020/api/product/pagination?page=${page}&category=${category}`,
      {
        headers: {
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNTIxYTdiM2M3YTY4OGQ2YWE2MTQiLCJpc19BZG1pbiI6dHJ1ZSwiaWF0IjoxNjU4NzM3ODk4fQ.PYgHclewRgYHexzZZ6G2qOmnjSRxTDDbVu6yeYbHpJo",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
        setMaxpage(res.maxPage);
      });
  }, [page, maxPage, category,emptySearch]);

  useEffect(() => {
    const searchAPI = () => {
      fetch(
        `http://localhost:3020/api/product/search?search=${props.searchData}`,
        {
          headers: {
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNTIxYTdiM2M3YTY4OGQ2YWE2MTQiLCJpc19BZG1pbiI6dHJ1ZSwiaWF0IjoxNjU4NzM3ODk4fQ.PYgHclewRgYHexzZZ6G2qOmnjSRxTDDbVu6yeYbHpJo",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if(props.searchData.length===0)
          setEmptySearch((prev)=>!prev)
          setProducts(res.data)});
    };
    //  setTimeout(()=>{
    searchAPI();
    //  },1000) 
  }, [props.searchData]);

  return (
    <>
      <Header search={props.search} />
      <Grid className={classes.card} sx={{ mt: 8, m: "auto" }}>
        <Box
          sx={{
            minWidth: 120,
            display: "flex",
            justifyContent: "flex-end",
            mr: "2rem",
          }}
        >
          {admin === "true" && (
            <Link
              to="/product"
              className={classes.sort}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                sx={{
                  mr: "1rem",
                  color: "#696969",
                  borderColor: "#d6d6d6",
                  width: "175px",
                  height: "54px",
                }}
              >
                Create Product
              </Button>
            </Link>
          )}
          <div className={classes.category}>
            <FormControl sx={{ minWidth: "12rem" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Sort"
                onChange={handleCategoryChange}
              >
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="laptop">Laptop</MenuItem>
                <MenuItem value="tablet">Tablet</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.sort}>
            <FormControl sx={{ minWidth: "12rem" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleChange}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>

        <Grid container>
          {products.map((product) => (
            <Grid
              item
              key={product._id}
              xs={12}
              sm={4}
              lg={3}
              sx={{ marginBottom: "2rem" }}
            >
              <NoteCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Pagination
        count={maxPage}
        size="large"
        sx={{ display: "flex", justifyContent: "center" }}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePagination}
      />
    </>
  );
};
export default Home;
