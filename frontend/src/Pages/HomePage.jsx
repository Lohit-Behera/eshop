import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "@/components/Product";
import { fetchGetProducts } from "@/features/ProductSlice";
import CustomPagination from "@/components/CustomPagination";

function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  let keyword = location.search;
  console.log(keyword);
  const getProducts = useSelector((state) => state.product.products) || {};
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
    dispatch(fetchGetProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="w-[95%] mx-auto bg-inherit border-2 rounded-lg">
      <div className="m-2 md:m-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          {keyword ? "Products" : "Latest Products"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <Product product={product} />
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
