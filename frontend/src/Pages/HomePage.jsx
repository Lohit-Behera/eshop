import React from "react";
import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "@/components/Product";
import { fetchGetProducts } from "@/features/ProductSlice";
import {
  fetchCreateCart,
  resetCreateCart,
  fetchGetCart,
} from "@/features/CartSlice";
import HomeLoader from "@/components/PageLoader/HomeLoader";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const CustomPagination = lazy(() => import("@/components/CustomPagination"));
const CustomImage = lazy(() => import("@/components/CustomImage"));
const ServerError = lazy(() => import("./ServerError"));

function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let keyword = location.search;

  const userInfo = useSelector((state) => state.user.userInfo);
  const getProducts = useSelector((state) => state.product.products) || {};
  const topProducts = useSelector((state) => state.product.topProducts) || [];
  const createCartStatus = useSelector((state) => state.cart.createCartStatus);
  const productsStatus = useSelector((state) => state.product.productsStatus);
  const products = getProducts.products || [];
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
      dispatch(fetchGetCart());
      dispatch(resetCreateCart());
    } else if (createCartStatus === "failed") {
      dispatch(fetchGetCart());
      dispatch(resetCreateCart());
    }
  }, [dispatch, createCartStatus]);

  useEffect(() => {
    dispatch(fetchGetProducts(keyword));
  }, [dispatch, keyword]);

  const handleAddToCart = (productId) => {
    if (!userInfo) {
      navigate("/login");
    } else {
      const CreateCartPromise = dispatch(
        fetchCreateCart({
          product_id: productId,
          quantity: 1,
        })
      ).unwrap();
      toast.promise(CreateCartPromise, {
        loading: "Adding to cart...",
        success: "Item added to cart successfully",
        error: "Failed to add item to cart",
      });
    }
  };

  return (
    <div className="w-[95%] min-h-[80vh] mx-auto border-2 rounded-lg space-y-4 backdrop-blur bg-background/50">
      <Suspense fallback={<HomeLoader />}>
        <div className="m-2 md:m-4">
          {productsStatus === "loading" ? (
            <HomeLoader />
          ) : productsStatus === "failed" ? (
            <ServerError />
          ) : (
            <>
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
                              <CustomImage
                                className="w-[70%] h-56 md:h-128 m-4"
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
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
}

export default HomePage;
