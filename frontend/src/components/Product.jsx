import React from "react";
import { Link } from "react-router-dom";
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

function Product({ product }) {
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
              <Button variant="default">Add to Cart</Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Product;
