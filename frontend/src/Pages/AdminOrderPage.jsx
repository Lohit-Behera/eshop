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
import Loader from "@/components/Loader/Loader";
import ServerError from "./ServerError";

function AdminOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let keyword = location.search;

  const userInfo = useSelector((state) => state.user.userInfo);
  const getAllOrder =
    useSelector((state) => state.adminOrder.getAllOrder) || [];
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
    <div className="w-[95%] mx-auto border-2 rounded-lg p-4 mt-8">
      {deleteOrderStatus === "loading" ? (
        <Loader />
      ) : deleteOrderStatus === "succeeded" || deleteOrderStatus === "idle" ? (
        <>
          <h1 className="text-2xl font-bold text-center">Admin Order Page</h1>
          <Table>
            <TableCaption>
              <CustomPagination
                keyword="?page="
                page={currentPage}
                pages={pages}
                link="/admin/order"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-56">Order Id</TableHead>
                <TableHead className="w-28">Total Price</TableHead>
                <TableHead className="w-32">Purchase Date</TableHead>
                <TableHead className="w-14">Paid</TableHead>
                <TableHead className="w-20">Delivered</TableHead>
                <TableHead className="w-32">Delivery Date</TableHead>
                <TableHead className="w-20">Edit</TableHead>
                <TableHead className="w-20">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>₹{order.total_price}</TableCell>
                  <TableCell>{order.created_at.substr(0, 10)}</TableCell>
                  <TableCell>{order.is_paid ? "Yes" : "No"}</TableCell>
                  <TableCell>{order.is_delivered ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {order.delivered_at ? order.delivered_at.substr(0, 10) : ""}
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
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
