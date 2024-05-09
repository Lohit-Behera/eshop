import React from "react";
import { useLocation } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function HomeLoader() {
  const location = useLocation();
  let keyword = location.search;
  return (
    <div className="w-full mt-8 space-y-8">
      {keyword === "?page1" ||
        (!keyword && (
          <Skeleton className="w-[95%] md:w-[80%] lg:w-[70%] h-56 md:h-128 rounded-lg mx-auto" />
        ))}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-full h-60 rounded-lg" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-[60%] h-3 rounded-lg" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <div className="mt-9 space-y-4">
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <div className="flex justify-between">
                <Skeleton className="w-[40%] h-6 rounded-lg" />
                <Skeleton className="w-[40%] h-6 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-full h-60 rounded-lg" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-[60%] h-3 rounded-lg" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <div className="mt-9 space-y-4">
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <div className="flex justify-between">
                <Skeleton className="w-[40%] h-6 rounded-lg" />
                <Skeleton className="w-[40%] h-6 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-full h-60 rounded-lg" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-[60%] h-3 rounded-lg" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <div className="mt-9 space-y-4">
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <div className="flex justify-between">
                <Skeleton className="w-[40%] h-6 rounded-lg" />
                <Skeleton className="w-[40%] h-6 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-full h-60 rounded-lg" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-[60%] h-3 rounded-lg" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <div className="mt-9 space-y-4">
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <div className="flex justify-between">
                <Skeleton className="w-[40%] h-6 rounded-lg" />
                <Skeleton className="w-[40%] h-6 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-full h-60 rounded-lg" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-[60%] h-3 rounded-lg" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <div className="mt-9 space-y-4">
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <div className="flex justify-between">
                <Skeleton className="w-[40%] h-6 rounded-lg" />
                <Skeleton className="w-[40%] h-6 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-full h-60 rounded-lg" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-[60%] h-3 rounded-lg" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <Skeleton className="w-[90%] h-6 rounded-lg" />
            <div className="mt-9 space-y-4">
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <Skeleton className="w-[90%] h-6 rounded-lg" />
              <div className="flex justify-between">
                <Skeleton className="w-[40%] h-6 rounded-lg" />
                <Skeleton className="w-[40%] h-6 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomeLoader;
