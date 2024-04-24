import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts } from "./features/ProductSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);
  const productsStatus = useSelector((state) => state.product.status);

  return (
    <>
      {productsStatus === "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
