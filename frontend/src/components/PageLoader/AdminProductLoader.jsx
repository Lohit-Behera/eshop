import React from "react";
import { Skeleton } from "../ui/skeleton";

function AdminProductLoader() {
  return (
    <div className="w-full mt-8 space-y-8">
      <Skeleton className="w-[15%] h-8 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-10 rounded-lg mx-auto" />
      <div className="flex justify-end">
        <Skeleton className="w-[10%] h-10 rounded-lg mr-4" />
      </div>
    </div>
  );
}

export default AdminProductLoader;
