import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetCart,
  fetchDeleteCart,
  resetCreateCart,
  resetDeleteCart,
} from "@/features/CartSlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const getCart = useSelector((state) => state.cart.getCart) || [];
  const createCartStatus = useSelector((state) => state.cart.createCartStatus);
  const deleteCartStatus = useSelector((state) => state.cart.deleteCartStatus);
  const getCartStatus = useSelector((state) => state.cart.getCartStatus);

  const totalPrice = getCart.reduce((total, item) => {
    if (item.quantity > 0) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (createCartStatus === "succeeded") {
      dispatch(fetchGetCart());
      dispatch(resetCreateCart());
    } else if (createCartStatus === "failed") {
      toast.error("Something went wrong");
      dispatch(fetchGetCart());
    }
  }, [dispatch, createCartStatus]);

  useEffect(() => {
    if (deleteCartStatus === "succeeded") {
      toast.success("Item deleted successfully");
      dispatch(fetchGetCart());
      dispatch(resetDeleteCart());
    } else if (deleteCartStatus === "failed") {
      toast.error("Something went wrong");
      dispatch(fetchGetCart());
    }
  }, [dispatch, deleteCartStatus]);

  const deleteItem = (id) => {
    dispatch(fetchDeleteCart(id));
  };

  return (
    <div className="w-[95%] mx-auto bg-inherit border-2 rounded-lg min-h-screen">
      <div className="m-2 lg:m-4">
        <h1 className="text-2xl font-bold text-center mb-6">Cart</h1>
        {getCart.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-center text-xl font-semibold">Cart is empty</p>
            <Button className="mx-auto">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-grow lg:flex ">
            <div className="w-[95%] lg:w-3/4 m-auto">
              <h2 className="text-xl font-semibold text-center mb-4">
                Cart Items
              </h2>
              {getCart.map((item) => (
                <div
                  key={item.id}
                  className={`flex-grow lg:flex justify-center lg:justify-between items-center border-2 p-2 rounded-lg my-4 space-y-2 text-center ${
                    item.quantity === 0 && "opacity-50"
                  }`}
                >
                  <Link to={`/product/${item.product}`}>
                    <img
                      className="w-24 h-20 object-cover rounded-lg mx-auto lg:mx-0"
                      src={item.image}
                      alt={item.name}
                    />
                  </Link>
                  <Link to={`/product/${item.product}`}>
                    <p className="lg:truncate font-semibold w-56 mx-auto lg:mx-0 hover:underline">
                      {item.name}
                    </p>
                  </Link>
                  {item.quantity === 0 ? (
                    <p className="text-sm lg:text-base font-semibold">
                      Out of Stock you can remove it or wait for it to be in
                      stock
                    </p>
                  ) : (
                    <>
                      <p className="text-sm lg:text-base">
                        Price-₹{item.price}
                      </p>
                      <p>Quantity-{item.quantity}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">Change Quantity</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Select Quantity</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {[...Array(item.countInStock).keys()]
                            .slice(0, 5)
                            .map((i) => (
                              <DropdownMenuItem key={i + 1}>
                                {i + 1}
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  <Button
                    className="ml-4 lg:ml-0"
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="w-[95%] lg:w-1/4 m-auto border-2 mx-2 rounded-lg ">
              <h1 className="text-xl font-semibold text-center my-2">
                Cart Summary
              </h1>
              <div className="flex-grow m-4 space-y-4">
                <p className="text-sm md:text-base">
                  Total Items:&nbsp;{getCart.length}
                </p>
                <p className="text-sm md:text-base">
                  Total Price:&nbsp;₹{totalPrice}
                </p>
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
