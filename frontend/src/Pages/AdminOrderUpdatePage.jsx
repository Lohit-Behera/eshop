import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminGetOrderById,
  fetchUpdateOrder,
  resetGetOrderById,
} from "@/features/AdminOrderSlice";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";

function AdminOrderUpdatePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const getOrder = useSelector((state) => state.adminOrder.getOrderById);
  const updateOrderStatus = useSelector(
    (state) => state.adminOrder.updateOrderStatus
  );

  const order = getOrder ? getOrder.order : {};
  const address = getOrder ? getOrder.address : {};
  const orderItems = getOrder ? getOrder.items : [];
  const orderDate = new Date(order.created_at);
  const DeliveredDate = new Date(order.delivered_at);

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(fetchAdminGetOrderById(id));
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, id, navigate]);

  useEffect(() => {
    if (updateOrderStatus === "succeeded") {
      toast.success("Order updated successfully");
      dispatch(resetGetOrderById());
      dispatch(fetchAdminGetOrderById(id));
    } else if (updateOrderStatus === "failed") {
      toast.error("Something went wrong");
      dispatch(resetGetOrderById());
    }
  }, [dispatch, updateOrderStatus]);

  return (
    <div className="w-[95%] mx-auto border-2 mt-8 rounded-lg bg-background/50">
      {updateOrderStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center my-6">Order Summary</h1>
          <div className="w-[95%] mx-auto">
            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            <div className="w-[95%] text-sm md:text-base border-2 p-2 rounded-lg my-4 mx-auto space-y-2 bg-background/50">
              <p>Order Id: {order.id} </p>
              <p>
                Purchase Date:{" "}
                {`${orderDate.getFullYear()}-${
                  orderDate.getMonth() + 1
                }-${orderDate.getDate()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`}{" "}
              </p>
              <p>
                Shipping Charge:{" "}
                {order.shipping_price < 1 ? "Free" : order.shipping_price}
              </p>
              <p>Total Amount: {order.total_price} </p>
              <p>Paid: {order.is_paid ? "Yes" : "No"} </p>
              <p>Payment Id: {order.order_payment_id} </p>
              <p>
                Delivery Status:{" "}
                {order.is_delivered ? "Delivered" : "Not Delivered"}
              </p>
              {order.is_delivered && (
                <p>
                  Delivered Date:{" "}
                  {`${DeliveredDate.getFullYear()}-${
                    DeliveredDate.getMonth() + 1
                  }-${DeliveredDate.getDate()} ${DeliveredDate.getHours()}:${DeliveredDate.getMinutes()}:${DeliveredDate.getSeconds()}`}{" "}
                </p>
              )}
            </div>
            {!order.is_delivered && (
              <div className="flex justify-end mr-16">
                <Button
                  className="md:text-base"
                  onClick={() => dispatch(fetchUpdateOrder(id))}
                >
                  Delivered
                </Button>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <div className="w-[95%] grid grid-cols-2 lg:grid-cols-3 text-sm md:text-base border-2 p-2 rounded-lg my-4 mx-auto space-y-2 bg-background/50">
              <div>
                <p>House No: {address.house_no} </p>
                <p>LandMark: {address.landmark} </p>
              </div>
              <div>
                <p>City: {address.city} </p>
                <p>State: {address.state} </p>
              </div>
              <div>
                <p>Pincode: {address.pincode} </p>
                <p>Country: {address.country} </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Order Items</h2>
              {orderItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.qty > 0 && (
                    <div
                      key={item.id}
                      className="w-[95%] mx-auto flex-grow lg:flex justify-center lg:justify-between items-center border-2 p-2 rounded-lg my-4 space-y-2 text-center bg-background/50"
                    >
                      <Link to={`/product/${item.id}`}>
                        <img
                          className="w-24 h-20 object-cover rounded-lg mx-auto lg:mx-0"
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      <Link to={`/product/${item.id}`}>
                        <p className="lg:truncate font-semibold w-56 mx-auto lg:mx-0 hover:underline">
                          {item.name}
                        </p>
                      </Link>
                      <p className="font-semibold">₹{item.price}</p>
                      <p className="font-semibold">Quantity: {item.qty}</p>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="w-[95%] mx-auto">
            <Button
              className="w-full my-4 mb-8 md:text-base"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrderUpdatePage;
