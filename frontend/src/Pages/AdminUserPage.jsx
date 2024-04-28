import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetAllUsers,
  fetchGiveAdmin,
  fetchRemoveAdmin,
  fetchDeleteUser,
  reset,
} from "@/features/AdminUsers";

import { Check, X } from "lucide-react";
import CustomPagination from "@/components/CustomPagination";
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

function AdminUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let keyword = location.search;

  const userInfo = useSelector((state) => state.user.userInfo);
  const allUsers = useSelector((state) => state.adminUsers.allUsers);
  const admin = useSelector((state) => state.adminUsers.admin);
  const adminStatus = useSelector((state) => state.adminUsers.adminStatus);
  const adminSuccess = adminStatus === "succeeded";
  const removeAdmin = useSelector((state) => state.adminUsers.removeAdmin);
  const removeAdminStatus = useSelector(
    (state) => state.adminUsers.removeAdminStatus
  );
  const removeAdminSuccess = removeAdminStatus === "succeeded";
  const deleteUserStatus = useSelector(
    (state) => state.adminUsers.deleteUserStatus
  );
  const deleteUserSuccess = deleteUserStatus === "succeeded";

  const users = allUsers ? allUsers.users : [];
  const pages = allUsers ? allUsers.pages : 1;
  const adminEmail = admin ? admin.email : "";
  const removeAdminEmail = removeAdmin ? removeAdmin.email : "";
  const is_staff = userInfo ? userInfo.is_staff : false;

  const [currentPage, setCurrentPage] = useState(allUsers ? allUsers.page : 1);

  useEffect(() => {
    if (!is_staff) {
      navigate("/");
    }
  }, [is_staff]);

  useEffect(() => {
    dispatch(fetchGetAllUsers(keyword));
  }, [
    dispatch,
    adminSuccess,
    currentPage,
    deleteUserSuccess,
    removeAdminSuccess,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(reset());
    }, 3700);
    return () => clearTimeout(timer);
  }, [dispatch, adminSuccess, deleteUserSuccess, removeAdminSuccess]);

  const adminHandler = (id) => {
    dispatch(
      fetchGiveAdmin({
        id: id,
        is_staff: true,
      })
    );
  };

  const removeAdminHandler = (id) => {
    dispatch(
      fetchRemoveAdmin({
        id: id,
        is_staff: false,
      })
    );
  };

  const deleteHandler = (id) => {
    dispatch(fetchDeleteUser(id));
  };

  return (
    <div className="w-[96%] min-h-screen mx-auto bg-background border-2 rounded-lg mt-6">
      <Table>
        <TableCaption className="my-4">
          <CustomPagination
            keyword="?page="
            page={currentPage}
            pages={pages}
            link="/admin/user"
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Email</TableHead>
            <TableHead className="w-[20%]">Name</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Change to Admin</TableHead>
            <TableHead>Remove Admin</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.first_name + " " + user.last_name}</TableCell>
              <TableCell>
                {user.is_verified ? (
                  <Check className="text-primary" strokeWidth={4} />
                ) : (
                  <X className="text-primary" strokeWidth={4} />
                )}
              </TableCell>
              <TableCell>
                {user.is_staff ? (
                  <Check className="text-primary" strokeWidth={4} />
                ) : (
                  <X className="text-primary" strokeWidth={4} />
                )}
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={user.is_staff}>Admin</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you want to make {user.email} him admin?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => adminHandler(user.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={!user.is_staff}>Remove Admin</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you want to remove {user.email} him from admin?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeAdminHandler(user.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete {user.email} account and remove your data from
                        our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteHandler(user.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminUserPage;
