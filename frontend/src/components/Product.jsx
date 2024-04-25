import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import Rating from "./Rating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchCreateCart, resetCreateCart } from "@/features/CartSlice";

function Product({ product }) {
  const dispatch = useDispatch();

  const createCartStatus = useSelector((state) => state.cart.createCartStatus);

  useEffect(() => {
    if (createCartStatus === "succeeded" || createCartStatus === "failed") {
      dispatch(resetCreateCart());
    }
  }, [dispatch, createCartStatus]);

  const addToCart = () => {
    dispatch(
      fetchCreateCart({
        product_id: product.id,
        quantity: 1,
      })
    );
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <Link to={`/product/${product.id}`}>
            <img
              className="w-full h-60 object-cover rounded-lg "
              src={product.image}
              alt={product.name}
            />
          </Link>
        </CardTitle>
        <CardDescription>{product.brand}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link to={`/product/${product.id}`}>
          <h2 className="min-h-14 text-xl font-semibold line-clamp-2 hover:underline">
            {product.name}
          </h2>
        </Link>
        <Rating value={product.rating} reviews={product.numReviews} />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full space-y-2">
          <div className="flex justify-between w-full">
            <div className="mt-2">
              {product.countInStock === 0 ? (
                "Out of Stock"
              ) : product.countInStock < 5 ? (
                <>{`Hurry Only ${product.countInStock} left`}</>
              ) : (
                " Stock - Available"
              )}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <h1 className="text-lg font-semibold mt-1">
              Price -&nbsp;₹{product.price}
            </h1>
            {product.countInStock === 0 ? null : (
              <>
                {createCartStatus === "idle" ? (
                  <Button variant="default" onClick={addToCart}>
                    Add to Cart
                  </Button>
                ) : createCartStatus === "loading" ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button variant="default" disabled>
                    Add to Cart
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Product;
