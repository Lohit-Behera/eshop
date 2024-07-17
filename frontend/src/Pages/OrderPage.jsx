import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOrderById } from "@/features/OrderSlice";
import CustomImage from "@/components/CustomImage";

function OrderPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const getOrder = useSelector((state) => state.order.getOrder);
  const getCartStatus = useSelector((state) => state.cart.getCartStatus);
  const order = getOrder ? getOrder.order : {};
  const address = getOrder ? getOrder.address : {};
  const orderItems = getOrder ? getOrder.items : [];
  const orderDate = new Date(order.created_at);
  const DeliveredDate = new Date(order.delivered_at);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(fetchGetOrderById(id));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="w-[95%] mx-auto border-2 min-h-[80vh] rounded-lg backdrop-blur bg-background/50">
      <h1 className="text-2xl font-bold text-center my-6">Order Summary</h1>
      <div className="w-[95%] mx-auto">
        <h2 className="text-xl font-semibold mb-2">Order Details</h2>
        <div className="w-[95%] text-sm md:text-base border-2 p-2 md:px-4 rounded-lg my-4 mx-auto space-y-2 backdrop-blur bg-background/50">
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
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        <div className="w-[95%] grid grid-cols-2 lg:grid-cols-3 text-sm md:text-base border-2 p-2 md:px-4 rounded-lg my-4 mx-auto space-y-2 backdrop-blur bg-background/50">
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
                  className="w-[95%] mx-auto flex-grow lg:flex justify-center lg:justify-between items-center border-2 p-2 md:px-4 rounded-lg my-6 space-y-2 text-center backdrop-blur bg-background/50"
                >
                  <Link to={`/product/${item.id}`}>
                    <CustomImage
                      className="w-24 h-20 lg:mx-0"
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
      <p className="text-center mb-4">
        Order has been placed successfully. Thank you for shopping with us.
      </p>
    </div>
  );
}

export default OrderPage;
