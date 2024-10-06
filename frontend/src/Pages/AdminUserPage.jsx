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

import { Check, Trash, UserMinus, UserPlus, X } from "lucide-react";
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
import { toast } from "sonner";
import AdminUserLoader from "@/components/PageLoader/AdminUserLoader";

function AdminUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let keyword = location.search;

  const userInfo = useSelector((state) => state.user.userInfo);
  const allUsers = useSelector((state) => state.adminUsers.allUsers);
  const allUsersStatus = useSelector(
    (state) => state.adminUsers.allUsersStatus
  );
  const adminStatus = useSelector((state) => state.adminUsers.adminStatus);
  const removeAdminStatus = useSelector(
    (state) => state.adminUsers.removeAdminStatus
  );
  const deleteUserStatus = useSelector(
    (state) => state.adminUsers.deleteUserStatus
  );
  const users = allUsers ? allUsers.users : [];
  const pages = allUsers ? allUsers.pages : 1;
  const is_staff = userInfo ? userInfo.is_staff : false;

  const [currentPage, setCurrentPage] = useState(allUsers ? allUsers.page : 1);

  useEffect(() => {
    if (!is_staff) {
      navigate("/");
    }
  }, [is_staff]);

  useEffect(() => {
    dispatch(fetchGetAllUsers(keyword));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (adminStatus === "succeeded") {
      dispatch(fetchGetAllUsers(keyword));
      dispatch(reset());
    } else if (removeAdminStatus === "succeeded") {
      dispatch(fetchGetAllUsers(keyword));
      dispatch(reset());
    } else if (deleteUserStatus === "succeeded") {
      dispatch(fetchGetAllUsers(keyword));
      dispatch(reset());
    } else if (
      adminStatus === "failed" ||
      deleteUserStatus === "failed" ||
      removeAdminStatus === "failed"
    ) {
      dispatch(fetchGetAllUsers(keyword));
      dispatch(reset());
    }
  }, [dispatch, adminStatus, removeAdminStatus, deleteUserStatus]);

  const adminHandler = (id) => {
    const adminPromise = dispatch(
      fetchGiveAdmin({
        id: id,
        is_staff: true,
      })
    ).unwrap();
    toast.promise(adminPromise, {
      loading: "Adding admin...",
      success: "Admin added successfully",
      error: "Something went wrong",
    });
  };

  const removeAdminHandler = (id) => {
    const removeAdminPromise = dispatch(
      fetchRemoveAdmin({
        id: id,
        is_staff: false,
      })
    ).unwrap();
    toast.promise(removeAdminPromise, {
      loading: "Removing admin...",
      success: "Admin removed successfully",
      error: "Something went wrong",
    });
  };

  const deleteHandler = (id) => {
    const deleteUserPromise = dispatch(fetchDeleteUser(id)).unwrap();
    toast.promise(deleteUserPromise, {
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: "Something went wrong",
    });
  };

  return (
    <div className="w-[96%] min-h-[80vh] mx-auto backdrop-blur bg-background/70 border-2 rounded-lg">
      {allUsersStatus === "loading" ? (
        <AdminUserLoader />
      ) : (
        <>
          <p className="text-2xl font-semibold my-4 text-center">User List</p>
          <Table>
            {pages > 1 && (
              <TableCaption className="my-4">
                <CustomPagination
                  keyword="?page="
                  page={currentPage}
                  pages={pages}
                  link="/admin/users"
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto md:w-[20%]">Email</TableHead>
                <TableHead className="w-auto md:w-[20%]">Name</TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Verified
                </TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Admin
                </TableHead>
                <TableHead className="hidden lg:table-cell text-center">
                  Change to Admin
                </TableHead>
                <TableHead className="hidden lg:table-cell text-center">
                  Remove Admin
                </TableHead>
                <TableHead className="hidden lg:table-cell">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="truncate">{user.email}</TableCell>
                  <TableCell className="truncate">
                    {user.first_name + " " + user.last_name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.is_verified ? (
                      <Check className="text-primary mx-auto" strokeWidth={4} />
                    ) : (
                      <X className="text-primary mx-auto" strokeWidth={4} />
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.is_staff ? (
                      <Check className="text-primary mx-auto" strokeWidth={4} />
                    ) : (
                      <X className="text-primary mx-auto" strokeWidth={4} />
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <AlertDialog>
                      <AlertDialogTrigger
                        className="flex justify-center mx-auto"
                        asChild
                      >
                        <Button size="icon" disabled={user.is_staff}>
                          <UserPlus />
                        </Button>
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
                          <AlertDialogAction
                            onClick={() => adminHandler(user.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <AlertDialog>
                      <AlertDialogTrigger
                        className="flex justify-center mx-auto"
                        asChild
                      >
                        <Button size="icon" disabled={!user.is_staff}>
                          <UserMinus />
                        </Button>
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
                  <TableCell className="hidden lg:table-cell">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="destructive">
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
                            delete {user.email} account and remove your data
                            from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteHandler(user.id)}
                          >
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
        </>
      )}
    </div>
  );
}

export default AdminUserPage;
