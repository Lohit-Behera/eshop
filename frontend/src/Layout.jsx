import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts } from "./features/ProductSlice";
import { fetchUserDetails } from "./features/UserSlice";
import { fetchGetCart } from "./features/CartSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchGetProducts());
    if (userInfo) {
      dispatch(fetchUserDetails(userInfo.id));
      dispatch(fetchGetCart());
    }
  }, [dispatch, userInfo]);

  const userDetailsStatus = useSelector(
    (state) => state.user.userDetailsStatus
  );
  const productsStatus = useSelector((state) => state.product.status);
  const getCartStatus = useSelector((state) => state.cart.getCartStatus);

  return (
    <>
      {productsStatus === "loading" &&
      userDetailsStatus === "loading" &&
      getCartStatus === "loading" ? (
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
