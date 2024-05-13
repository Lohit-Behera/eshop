import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomPagination from "@/components/CustomPagination";
import { fetchContactUsGetAll } from "@/features/ContactUsSlice";
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

import { FileSearch, Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import AdminOrderLoader from "@/components/PageLoader/AdminOrderLoader";

function AdminContactPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const getAllContactUs =
    useSelector((state) => state.contactUs.getAllContactUs) || [];

  useEffect(() => {
    if (userInfo && userInfo.is_staff) {
      dispatch(fetchContactUsGetAll());
    } else {
      navigate("/login");
    }
  }, [userInfo, dispatch]);
  return (
    <div className="w-[95%] min-h-[80vh] mx-auto border-2 rounded-lg p-4 bg-background/70">
      <h1 className="text-2xl font-bold text-center">AdminContactPage</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="hidden md:table-cell">Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAllContactUs.map((query) => (
            <TableRow key={query.id}>
              <TableCell>
                <div className="hidden font-medium lg:inline">
                  {query.email}
                </div>
                <div className="text-sm text-muted-foreground ">
                  {query.name}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {query.subject}
              </TableCell>
              <TableCell>
                <Badge
                  className="text-xs"
                  variant={query.is_resolved ? "default" : "secondary"}
                >
                  {query.is_resolved ? "Resolved" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {query.created_at.substr(0, 10)}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/admin/query/${query.id}`)}
                >
                  <FileSearch />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminContactPage;
