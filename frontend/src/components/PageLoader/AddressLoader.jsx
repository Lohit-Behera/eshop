import React from "react";
import { Skeleton } from "../ui/skeleton";

function AddressLoader() {
  return (
    <div className="w-[95%] flex-grow md:flex justify-between gap-5 sm:space-y-4 md:space-y-0 bg-background p-4">
      <div className="w-full gap-2 space-y-2">
        <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
        <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
      </div>
      <div className="w-full gap-2 space-y-2">
        <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
        <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
      </div>
      <div className="w-full gap-2 space-y-2">
        <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
        <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
      </div>
      <div className="w-full gap-2 space-y-2">
        <Skeleton className="w-8 md:w-12 h-8 md:h-12 rounded-lg" />
      </div>
    </div>
  );
}

export default AddressLoader;
