import React from "react";
import { Skeleton } from "../ui/skeleton";

function ProductDetailsLoader() {
  return (
    <div className="w-full bg-background/50">
      <div className="flex-grow md:flex justify-center w-[96%] mx-auto space-x-5">
        <Skeleton className="w-[95%] md:w-[42%] h-128 my-7 rounded-lg m-4" />
        <div className="w-[95%] md:w-[46%] mx-auto m-4 space-y-4">
          <Skeleton className="w-[10%] h-3 rounded-lg" />
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-[35%] h-6 rounded-lg" />
          <Skeleton className="w-[20%] h-6 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-full h-3 rounded-lg" />
          <div className="w-full flex justify-between">
            <Skeleton className="w-[20%] h-5 rounded-lg" />
            <Skeleton className="w-[20%] h-5 rounded-lg" />
          </div>
          <div className="w-full flex justify-between">
            <Skeleton className="w-[20%] h-5 rounded-lg" />
            <Skeleton className="w-[20%] h-5 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsLoader;
