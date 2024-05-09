import React from "react";
import { Skeleton } from "../ui/skeleton";

function AdminOrderLoader() {
  return (
    <div className="w-full mt-8 space-y-8">
      <Skeleton className="w-[50%] md:w-[10%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-6 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
      <Skeleton className="w-[98%] h-8 bg-primary/70 rounded-lg mx-auto" />
    </div>
  );
}

export default AdminOrderLoader;
