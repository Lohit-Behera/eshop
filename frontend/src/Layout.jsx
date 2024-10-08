import React from "react";
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts, fetchTopProducts } from "./features/ProductSlice";
import { fetchUserDetails, resetUserUpdate } from "./features/UserSlice";
import { fetchGetCart } from "./features/CartSlice";
import { fetchGetAllOrders } from "./features/OrderSlice";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FallBack from "./components/FallBack";
import Loader from "./components/Loader/Loader";
import ServerError from "./Pages/ServerError";
import { toast } from "sonner";
import { AuroraBackground } from "./components/ui/aurora-background";

function Layout() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userUpdateStatus = useSelector((state) => state.user.userUpdateStatus);

  useEffect(() => {
    dispatch(fetchGetProducts());
    dispatch(fetchTopProducts());
    if (userInfo) {
      dispatch(fetchUserDetails(userInfo.id));
      dispatch(fetchGetCart());
      dispatch(fetchGetAllOrders());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userUpdateStatus === "succeeded") {
      dispatch(fetchUserDetails(userInfo.id));
      dispatch(resetUserUpdate());
    }
  }, [userUpdateStatus]);

  const userDetailsStatus = useSelector(
    (state) => state.user.userDetailsStatus
  );
  const productsStatus = useSelector((state) => state.product.status);
  const getCartStatus = useSelector((state) => state.cart.getCartStatus);
  const getAllOrderStatus = useSelector(
    (state) => state.order.getAllOrderStatus
  );

  useEffect(() => {
    if (
      productsStatus === "failed" ||
      userDetailsStatus === "failed" ||
      getCartStatus === "failed" ||
      getAllOrderStatus === "failed"
    ) {
      toast.error("Something went wrong");
    }
  }, [productsStatus, userDetailsStatus, getCartStatus, getAllOrderStatus]);

  return (
    <div className="relative min-h-[80vh] h-full w-full">
      <div className="fixed inset-0 w-full h-full overflow-hidden object-cover -z-10">
        <AuroraBackground />
      </div>
      <Header />
      <main>
        <ErrorBoundary FallbackComponent={FallBack}>
          {productsStatus === "loading" ||
          userDetailsStatus === "loading" ||
          getAllOrderStatus === "loading" ? (
            <Loader hight="min-h-[80vh]" />
          ) : productsStatus === "failed" ||
            userDetailsStatus === "failed" ||
            getAllOrderStatus === "failed" ? (
            <ServerError />
          ) : (
            <>
              <ScrollRestoration />
              <Outlet />
            </>
          )}
        </ErrorBoundary>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
