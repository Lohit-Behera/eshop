import React from "react";
import { useSelector } from "react-redux";
import Product from "@/components/Product";

function HomePage() {
  const products = useSelector((state) => state.product.products) || [];
  return (
    <div className="w-[95%] mx-auto bg-inherit border-2 rounded-lg">
      <div className="m-2 md:m-4">
        <h1 className="text-2xl font-bold text-center mb-6">Latest Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
