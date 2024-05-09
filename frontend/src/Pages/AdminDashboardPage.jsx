import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { File, Box, User } from "lucide-react";
import { fetchGetAdminDashboard } from "@/features/AdminDashboardSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomImage from "@/components/CustomImage";
import ServerError from "./ServerError";
import Loader from "@/components/Loader/Loader";
import AdminDashboardLoader from "@/components/PageLoader/AdminDashboardLoader";

function AdminDashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dashboard =
    useSelector((state) => state.adminDashboard.adminDashboard) || {};
  const adminDashboardStatus = useSelector(
    (state) => state.adminDashboard.adminDashboardStatus
  );

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(fetchGetAdminDashboard());
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo]);

  const orders = dashboard.orders || [];
  const products = dashboard.products || [];
  return (
    <div className="w-[95%] min-h-[80vh] mx-auto border-2 rounded-lg p-4 bg-background/70">
      {adminDashboardStatus === "loading" ? (
        <AdminDashboardLoader />
      ) : adminDashboardStatus === "failed" ? (
        <ServerError />
      ) : adminDashboardStatus === "succeeded" ||
        adminDashboardStatus === "idle" ? (
        <>
          <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                      <CardDescription>Total Sales</CardDescription>
                      <CardTitle className="text-4xl">
                        ₹{dashboard.total_sales}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Total sales for all products
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                      <CardDescription>Total Orders</CardDescription>
                      <CardTitle className="text-4xl">
                        {dashboard.total_orders}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Orders customers has placed
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm text-foreground"
                        onClick={() => navigate("/admin/orders")}
                      >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">
                          All Orders
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                      <CardDescription>Total Products</CardDescription>
                      <CardTitle className="text-4xl">
                        {dashboard.total_product}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Products that Admin has created
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() => navigate("/admin/products")}
                      >
                        <Box className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                          All Products
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                      <CardDescription>Orders This Month</CardDescription>
                      <CardTitle className="text-4xl">
                        {dashboard.total_users}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Total users that have registered
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm text-foreground"
                        onClick={() => navigate("/admin/users")}
                      >
                        <User className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">
                          All Users
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription className="flex justify-between">
                      Recent orders from your store.
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm text-foreground"
                        onClick={() => navigate("/admin/orders")}
                      >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">
                          All Orders
                        </span>
                      </Button>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.created_at}>
                            <TableCell>
                              <div className="font-medium">{order.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {order.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge
                                className="text-xs"
                                variant={
                                  order.is_delivered ? "default" : "secondary"
                                }
                              >
                                {order.is_delivered ? "Delivered" : "Pending"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.created_at.substring(0, 10)}
                            </TableCell>
                            <TableCell className="text-right">
                              ₹{order.total_price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2">
                        Products
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        Recent products
                      </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() => navigate("/admin/products")}
                      >
                        <Box className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                          All Products
                        </span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Image
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stocks
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <Link to={`/product/${product.id}`}>
                                <p className="font-medium line-clamp-3 hover:underline">
                                  {product.name}
                                </p>
                              </Link>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <CustomImage
                                className="h-14 w-14 rounded-md"
                                src={product.image}
                                alt={product.name}
                              />
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge
                                className="text-xs"
                                variant={
                                  product.countInStock >= 5
                                    ? "default"
                                    : product.countInStock < 5 &&
                                      product.countInStock > 0
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {product.countInStock}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              ₹{product.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AdminDashboardPage;
