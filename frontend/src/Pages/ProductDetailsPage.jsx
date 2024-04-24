import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "@/features/ProductSlice";
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

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch]);

  const product = useSelector((state) => state.product.productDetail);
  const productStatus = useSelector(
    (state) => state.product.productDetailStatus
  );

  return (
    <div className="w-[95%] mx-auto bg-inherit border-2 mt-8 rounded-lg">
      <div className="m-2 md:m-4">
        <h1 className="text-2xl font-bold text-center mb-6">Product Details</h1>
        {productStatus === "loading" ? (
          <div>Loading...</div>
        ) : productStatus === "failed" ? (
          <p>failed</p>
        ) : productStatus === "succeeded" ? (
          <div className="flex-grow md:flex justify-center w-[96%] mx-auto">
            <div className="w-[95%] md:w-1/2 m-auto">
              <img
                className="w-[90%] object-cover rounded-lg m-4"
                src={product.image}
                alt=""
              />
            </div>
            <div className="w-[95%] md:w-1/2 space-y-2 mt-4">
              <div>
                <h1 className="text-sm md:text-base text-muted-foreground">
                  {product.brand}
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
                          <DropdownMenuLabel>Select Quantity</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {[...Array(product.countInStock).keys()]
                            .slice(0, 5)
                            .map((i) => (
                              <DropdownMenuItem key={i + 1}>
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
                    <Button variant="default" className="text-base md:text-lg">
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
