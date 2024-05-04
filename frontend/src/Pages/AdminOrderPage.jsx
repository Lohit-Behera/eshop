import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomPagination from "@/components/CustomPagination";
import {
  fetchGetOrders,
  fetchDeleteOrder,
  fetchUpdateOrder,
  resetUpdateOrder,
  resetDeleteOrder,
} from "@/features/AdminOrderSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import AdminOrderLoader from "@/components/PageLoader/AdminOrderLoader";

function AdminOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let keyword = location.search;

  const userInfo = useSelector((state) => state.user.userInfo);
  const getAllOrder =
    useSelector((state) => state.adminOrder.getAllOrder) || [];
  const getAllOrderStatus = useSelector(
    (state) => state.adminOrder.getAllOrderStatus
  );
  const deleteOrderStatus = useSelector(
    (state) => state.adminOrder.deleteOrderStatus
  );

  const allOrders = getAllOrder.orders || [];
  const page = getAllOrder.page || 1;
  const pages = getAllOrder.pages || 1;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(fetchGetOrders());
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (deleteOrderStatus === "succeeded") {
      toast.success("Order deleted successfully");
      dispatch(resetDeleteOrder());
      dispatch(fetchGetOrders());
    } else if (deleteOrderStatus === "failed") {
      toast.error("Failed to delete order");
      dispatch(resetDeleteOrder());
    }
  }, [deleteOrderStatus]);

  useEffect(() => {
    dispatch(fetchGetOrders(keyword));
  }, [dispatch, currentPage, keyword]);

  const deleteHandler = (id) => {
    dispatch(fetchDeleteOrder(id));
  };

  return (
    <div className="w-[95%] min-h-[80vh] mx-auto border-2 rounded-lg p-4 mt-8 bg-background/70">
      {deleteOrderStatus === "loading" || getAllOrderStatus === "loading" ? (
        <AdminOrderLoader />
      ) : deleteOrderStatus === "succeeded" || deleteOrderStatus === "idle" ? (
        <>
          <h1 className="text-2xl font-bold text-center">Admin Orders</h1>
          <Table>
            <TableCaption>
              {pages > 1 && (
                <CustomPagination
                  keyword="?page="
                  page={currentPage}
                  pages={pages}
                  link="/admin/order"
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Purchase Date
                </TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Delivered</TableHead>
                <TableHead className=" hidden lg:table-cell">
                  Delivery Date
                </TableHead>
                <TableHead className=" hidden lg:table-cell">Edit</TableHead>
                <TableHead className=" hidden lg:table-cell">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.name}</div>
                    <div className="hidden text-sm text-muted-foreground lg:inline">
                      {order.email}
                    </div>
                  </TableCell>
                  <TableCell>₹{order.total_price}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.created_at.substr(0, 10)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="text-xs"
                      variant={order.is_paid ? "default" : "secondary"}
                    >
                      {order.is_paid ? "Paid" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="text-xs"
                      variant={order.is_delivered ? "default" : "secondary"}
                    >
                      {order.is_delivered ? "Delivered" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className=" hidden lg:table-cell">
                    {order.delivered_at
                      ? order.delivered_at.substr(0, 10)
                      : "Not Delivered Yet"}
                  </TableCell>
                  <TableCell className=" hidden lg:table-cell">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/admin/update/order/${order.id}`)
                      }
                    >
                      <Pencil />
                    </Button>
                  </TableCell>
                  <TableCell className=" hidden lg:table-cell">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete {order.id} from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteHandler(order.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : null}
    </div>
  );
}

export default AdminOrderPage;
