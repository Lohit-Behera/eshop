import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "@/features/ProductSlice";
import { fetchCreateCart } from "@/features/CartSlice";
import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomImage from "@/components/CustomImage";
import ServerError from "./ServerError";
import ProductDetailsLoader from "@/components/PageLoader/ProductDetailsLoader";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch]);

  const [quantity, setQuantity] = useState(1);
  const userInfo = useSelector((state) => state.user.userInfo);
  const product = useSelector((state) => state.product.productDetail);
  const reviews = product ? product.reviews : [];
  const productStatus = useSelector(
    (state) => state.product.productDetailStatus
  );

  return (
    <div className="w-[95%] mx-auto border-2 mt-8 rounded-lg backdrop-blur bg-background/50">
      <div className="m-2 md:m-4">
        <h1 className="text-2xl font-bold text-center mb-6">Product Details</h1>
        {productStatus === "loading" ? (
          <ProductDetailsLoader />
        ) : productStatus === "failed" ? (
          <ServerError />
        ) : productStatus === "succeeded" ? (
          <>
            <div className="flex-grow md:flex justify-center w-[96%] mx-auto">
              <div className="w-[95%] md:w-1/2 m-auto">
                <CustomImage
                  className="w-[90%] m-4"
                  src={product.image}
                  alt=""
                />
              </div>
              <div className="w-[95%] md:w-1/2 space-y-2 mt-4">
                <div>
                  <h1 className="text-sm md:text-base text-muted-foreground hover:underline cursor-pointer">
                    <Link to={`/?brand=${product.brand}`}>{product.brand}</Link>
                  </h1>
                  <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
                    {product.name}
                  </h1>
                </div>
                <div className="flex text-lg font-semibold">
                  Rating -&nbsp;
                  <Rating
                    value={product.rating}
                    className="mt-1"
                    reviews={product.numReviews}
                    text
                  />
                </div>
                <div className="min-h-80">
                  <h2 className="text-lg font-semibold">Description:</h2>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                <div className="flex flex-col w-full space-y-2 text-base md:text-lg">
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
                    <div className="mr-2.5">
                      {product.countInStock === 0 ? null : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="text-base md:text-lg"
                            >
                              Quantity
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>
                              Select Quantity
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {[...Array(product.countInStock).keys()]
                              .slice(0, 5)
                              .map((i) => (
                                <DropdownMenuItem
                                  key={i + 1}
                                  onClick={() => setQuantity(i + 1)}
                                >
                                  {i + 1}
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <h1 className="text-lg font-semibold mt-1">
                      Price -&nbsp;₹{product.price}
                    </h1>
                    {product.countInStock === 0 ? null : (
                      <Button
                        variant="default"
                        className="text-base md:text-lg"
                        onClick={() =>
                          dispatch(
                            fetchCreateCart({
                              product_id: product.id,
                              quantity: quantity,
                            })
                          )
                        }
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[95%] mx-auto border-2 rounded-lg p-4 space-y-4 backdrop-blur bg-background/50 mt-8">
              <h1 className="text-2xl font-bold text-center mb-6">
                Product Reviews
              </h1>
              {userInfo ? (
                <div className="border-2 rounded-lg p-4 space-y-4">
                  <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
                  <div className="flex space-x-6">
                    <Label htmlFor="rating" className="md:text-base mt-1.5">
                      Select Rating
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default">Select Rating</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Select Rating</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Poor</DropdownMenuItem>
                        <DropdownMenuItem>Fair</DropdownMenuItem>
                        <DropdownMenuItem>Good</DropdownMenuItem>
                        <DropdownMenuItem>Very Good</DropdownMenuItem>
                        <DropdownMenuItem>Excellent</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid gap-2">
                    <Label className="md:text-base" htmlFor="description">
                      Product Description
                    </Label>
                    <Textarea
                      id="description"
                      type="description"
                      placeholder="Product Description"
                      className="md:text-base resize-none"
                      rows={6}
                    />
                  </div>
                </div>
              ) : (
                <h1>
                  Please{" "}
                  <Link
                    to="/login"
                    className="font-bold hover:text-primary hover:underline"
                  >
                    login
                  </Link>{" "}
                  to write a review
                </h1>
              )}
              <div className="border-2 rounded-lg p-4 space-y-4">
                <h2 className="text-xl font-semibold">Reviews</h2>
                {reviews.length === 0 ? (
                  <h1>No Reviews</h1>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-2 rounded-lg p-4 space-y-2"
                    >
                      <h1 className="text-lg font-semibold">{review.name}</h1>
                      <Rating value={review.rating} text={false} />
                      <p className="text-base">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
