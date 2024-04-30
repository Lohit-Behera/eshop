import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "@/components/Product";
import { fetchGetProducts } from "@/features/ProductSlice";
import {
  fetchCreateCart,
  resetCreateCart,
  fetchGetCart,
} from "@/features/CartSlice";
import { toast } from "react-toastify";
import CustomPagination from "@/components/CustomPagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  let keyword = location.search;
  console.log(
    `keyword: ${keyword} type: ${typeof keyword} value: '${keyword}' ${
      keyword !== ""
    }`
  );
  const getProducts = useSelector((state) => state.product.products) || {};
  const topProducts = useSelector((state) => state.product.topProducts) || [];
  const createCartStatus = useSelector((state) => state.cart.createCartStatus);
  const products = getProducts.products || [];
  const page = getProducts.page || 1;
  const pages = getProducts.pages || 1;
  const [currentPage, setCurrentPage] = useState(1);

  const pageKeyword = !keyword
    ? "?page="
    : keyword.includes("?page=")
    ? "?page="
    : keyword.includes("&page=")
    ? keyword.split("page=")[0] + "page="
    : `${keyword}&page=`;

  useEffect(() => {
    if (createCartStatus === "succeeded") {
      toast.success("Item added to cart!");
      dispatch(fetchGetCart());
      dispatch(resetCreateCart());
    } else if (createCartStatus === "failed") {
      toast.error("Something went wrong!");
      dispatch(fetchGetCart());
      dispatch(resetCreateCart());
    }
  }, [dispatch, createCartStatus]);

  useEffect(() => {
    if (keyword !== "") {
      dispatch(fetchGetProducts(keyword));
    }
  }, [dispatch, keyword]);

  const handleAddToCart = (productId) => {
    dispatch(
      fetchCreateCart({
        product_id: productId,
        quantity: 1,
      })
    );
  };

  return (
    <div className="w-[95%] mx-auto bg-inherit border-2 rounded-lg space-y-4">
      <div className="m-2 md:m-4">
        {!keyword || keyword === "?page=1" ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              Top Products
            </h1>
            <div className="w-[80%] mx-auto mb-4">
              <Carousel>
                <CarouselContent>
                  {topProducts.map((product) => (
                    <CarouselItem key={product.id}>
                      <Link to={`/product/${product.id}`}>
                        <img
                          className="w-[70%] h-56 md:h-128 object-cover rounded-lg m-4 mx-auto"
                          src={product.image}
                          alt=""
                        />
                      </Link>
                      <Link to={`/product/${product.id}`}>
                        <p className="text-center text-lg md:text-xl font-semibold hover:underline">
                          {product.name}
                        </p>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </>
        ) : null}
        <h1 className="text-2xl font-bold text-center mb-6">
          {pageKeyword === "?page=" ? "Latest Products" : "Products"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <Product product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
        <div className="mt-8">
          {pages > 1 && (
            <CustomPagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={pages}
              keyword={pageKeyword}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
