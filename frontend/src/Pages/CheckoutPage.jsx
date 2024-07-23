import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetAddress, fetchDeleteAddress } from "@/features/AddressSlice";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash } from "lucide-react";
import axios from "axios";
import { fetchCreateOrder, resetOrder } from "@/features/OrderSlice";
import Logo from "../assets/Logo.svg";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import CustomImage from "@/components/CustomImage";
import AddressLoader from "@/components/PageLoader/AddressLoader";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const userDetails = useSelector((state) => state.user.userDetails) || {};
  const getCart = useSelector((state) => state.cart.getCart) || [];
  const getAddress = useSelector((state) => state.address.getAddress) || [];
  const getAddressStatus = useSelector(
    (state) => state.address.getAddressStatus
  );
  const getCartStatus = useSelector((state) => state.cart.getCartStatus);
  const order = useSelector((state) => state.order.order) || {};
  const orderStatus = useSelector((state) => state.order.orderStatus);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (getCart.length === 0) {
      navigate("/cart");
      toast.warning("Cart is empty");
    } else {
      dispatch(fetchGetAddress());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (orderStatus === "succeeded") {
      toast.success("Order placed successfully");
      dispatch(resetOrder());
      navigate(`/order/${order.id}`);
    } else if (orderStatus === "failed") {
      toast.error("Something went wrong");
      dispatch(resetOrder());
    }
  }, [orderStatus]);

  const [addressId, setAddressId] = useState("");

  const totalPrice = getCart.reduce((total, item) => {
    if (item.quantity > 0) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  const shippingPrice = totalPrice > 2000 ? 0 : 200;

  const amount = totalPrice + shippingPrice;

  const orderItems = getCart
    .filter((item) => item.quantity > 0)
    .map((item, index) => ({
      cart_id: item.id,
      product: item.product,
      qty: item.quantity,
      product_image: item.image,
      price: item.price,
    }));

  const handlePayment = () => {
    if (!addressId) {
      toast.warning("Please select an address");
      return;
    } else if (totalPrice > 500000) {
      toast.warning("Razor pay is not support for orders over 5,00,000");
    } else {
      axios
        .post("/api/order/payment/", { amount: amount })
        .then((response) => {
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: response.data.amount,
            currency: "INR",
            name: "EShop",
            description: "Purchase Description",
            image: Logo,
            order_id: response.data.id,
            handler: function (response) {
              toast.success("Payment Successful");
              dispatch(
                fetchCreateOrder({
                  address: addressId,
                  shipping_price: shippingPrice,
                  total_price: totalPrice,
                  order_payment_id: response.razorpay_order_id,
                  orderItems: orderItems,
                })
              );
              console.log(response);
            },
            prefill: {
              name: userDetails.first_name + " " + userDetails.last_name,
              email: userDetails.email,
            },
            theme: {
              color: "#3b82f6",
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        })
        .catch((error) => {
          toast.error("Payment Failed");
          console.error("Error initiating payment:", error);
        });
    }
  };

  return (
    <div className="w-[95%] mx-auto border-2 min-h-[80vh] rounded-lg space-x-4 backdrop-blur bg-background/50">
      {orderStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center my-4">Order Summary</h1>

          <div className="flex-grow lg:flex ">
            <div className="w-[95%] lg:w-4/6 space-y-2 mb-4 m-2 border-2 rounded-lg p-4 backdrop-blur bg-background/50">
              {getAddressStatus === "loading" ? (
                <AddressLoader />
              ) : (
                <>
                  {getAddress.length > 0 ? (
                    <>
                      <h2 className="text-xl font-semibold">Select Address</h2>
                      <div className="w-[95%] mx-auto">
                        <RadioGroup>
                          {getAddress.map((address) => (
                            <div
                              className="flex flex-row items-center space-x-4 border-2 p-3 rounded-lg"
                              key={address.id}
                            >
                              <RadioGroupItem
                                value={address.id}
                                id={address.id}
                                onClick={() => setAddressId(address.id)}
                              />
                              <div className="w-[95%] flex-grow md:flex justify-between text-sm md:text-base space-y-2">
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
                                <div>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      dispatch(fetchDeleteAddress(address.id))
                                    }
                                  >
                                    <Trash />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                        <Button
                          onClick={() => navigate("/address")}
                          className="w-full mt-4"
                        >
                          Create new address
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold">Add Address</h2>
                      <p>You don't have any address you can create one</p>
                      <Button onClick={() => navigate("/address")}>
                        Add Address
                      </Button>
                    </>
                  )}
                </>
              )}
              <div>
                <h1 className="text-xl font-semibold">Items</h1>
                {getCart.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.quantity > 0 && (
                      <div
                        key={item.id}
                        className="w-[95%] mx-auto flex-grow lg:flex justify-center lg:justify-between items-center border-2 p-2 rounded-lg my-4 space-y-2 text-center"
                      >
                        <Link to={`/product/${item.product}`}>
                          <CustomImage
                            className="w-24 h-20 lg:mx-0"
                            src={item.image}
                            alt={item.name}
                          />
                        </Link>
                        <Link to={`/product/${item.product}`}>
                          <p className="lg:truncate font-semibold w-56 mx-auto lg:mx-0 hover:underline">
                            {item.name}
                          </p>
                        </Link>
                        <p className="font-semibold">₹{item.price}</p>
                        <p className="font-semibold">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="w-[95%] lg:w-2/6 space-y-2 border-2 rounded-lg p-4 m-2 mb-4 backdrop-blur bg-background/50">
              <h1 className="text-xl font-semibold text-center">Place Order</h1>
              <div className="w-[95%] mx-auto">
                <p className="font-semibold">Total Price: ₹ {totalPrice}</p>
                <p className="font-semibold">
                  Shipping: {shippingPrice > 0 ? "₹ 200" : "Free"}
                </p>
                <p className="font-semibold">
                  Total: ₹ {totalPrice + shippingPrice}
                </p>
                <Button onClick={handlePayment} className="w-full mt-4">
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
