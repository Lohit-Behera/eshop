import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function AdminDashboardLoader() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-[70%] md:w-[40%] lg:w-[15%] h-8 rounded-lg mx-auto" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>
                    <Skeleton className="w-[60%] h-3 rounded-lg mb-2" />
                  </CardDescription>
                  <CardTitle>
                    <Skeleton className="w-[90%] h-8 rounded-lg mb-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-[90%] h-3 rounded-lg" />
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>
                    <Skeleton className="w-[60%] h-3 rounded-lg mb-2" />
                  </CardDescription>
                  <CardTitle>
                    <Skeleton className="w-[90%] h-8 rounded-lg mb-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-[90%] h-3 rounded-lg" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="w-[60%] h-6 rounded-lg" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>
                    <Skeleton className="w-[60%] h-3 rounded-lg mb-2" />
                  </CardDescription>
                  <CardTitle>
                    <Skeleton className="w-[90%] h-8 rounded-lg mb-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-[90%] h-3 rounded-lg" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="w-[60%] h-6 rounded-lg" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>
                    <Skeleton className="w-[60%] h-3 rounded-lg mb-2" />
                  </CardDescription>
                  <CardTitle>
                    <Skeleton className="w-[90%] h-8 rounded-lg mb-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-[90%] h-3 rounded-lg" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="w-[60%] h-6 rounded-lg" />
                </CardFooter>
              </Card>
            </div>
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>
                  <Skeleton className="w-[40%] md:w-[30%] lg:w-[15%] h-8 rounded-lg mb-2" />
                </CardTitle>
                <CardDescription className="flex justify-between">
                  <Skeleton className="w-[60%] md:w-[40%] lg:w-[40%] h-3 rounded-lg mb-2" />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
                <Skeleton className="w-full h-8 rounded-lg" />
              </CardContent>
            </Card>
          </div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="w-full group flex items-center gap-2">
                  <Skeleton className="w-24 md:w-32 h-6 rounded-lg my-2" />
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  <Skeleton className="w-28 md:w-32 h-3 rounded-lg" />
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Skeleton className="w-24 md:w-32 h-6 rounded-lg" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5 mt-4">
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
              <Skeleton className="w-full h-12 rounded-lg" />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLoader;
