import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
import CustomImage from "./CustomImage";
import { PackagePlus } from "lucide-react";

function Product({ product, onAddToCart }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const addToCart = () => {
    onAddToCart(product.id);
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <Link to={`/product/${product.id}`}>
            <CustomImage
              className="w-full h-60"
              src={product.image}
              alt={product.name}
            />
          </Link>
        </CardTitle>
        <CardDescription>
          <Link to={`/?brand=${product.brand}`} className="hover:underline">
            {product.brand}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link to={`/product/${product.id}`}>
          <h2 className="min-h-14 text-xl font-semibold line-clamp-2 hover:underline">
            {product.name}
          </h2>
        </Link>
        <Rating value={product.rating} reviews={product.numReviews} text />
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
            {userInfo && product.countInStock !== 0 && (
              <Button variant="default" size="sm" onClick={addToCart}>
                <PackagePlus className="mr-2 w-4 h-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Product;
