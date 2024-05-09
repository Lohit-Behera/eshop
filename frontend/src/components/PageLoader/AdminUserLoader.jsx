import React from "react";
import { Skeleton } from "../ui/skeleton";

function AdminUserLoader() {
  return (
    <div className="w-full mt-8 space-y-8">
      <Skeleton className="w-[30%] md:w-[20%] lg:w-[10%] h-8 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 rounded-lg mx-auto" />
      <Skeleton className="w-[60%] h-6 rounded-lg mx-auto" />
    </div>
  );
}

export default AdminUserLoader;
