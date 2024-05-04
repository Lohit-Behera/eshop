import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserUpdate } from "@/features/UserSlice";
import CustomPassword from "@/components/CustomPassword";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "react-toastify";
import CustomPagination from "@/components/CustomPagination";
import { fetchGetAllOrders } from "@/features/OrderSlice";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let keyword = location.search;

  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetails = useSelector((state) => state.user.userDetails) || {};
  const userUpdateStatus = useSelector((state) => state.user.userUpdateStatus);
  const getAllOrders = useSelector((state) => state.order.getAllOrders) || [];
  const page = getAllOrders.page || 1;
  const pages = getAllOrders.pages || 1;
  const orders = getAllOrders.orders || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (userUpdateStatus === "succeeded") {
      window.location.reload();
      toast.success("User updated successfully");
    } else if (userUpdateStatus === "failed") {
      toast.error("User update failed");
    }
  }, [userUpdateStatus]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setFirstName(userDetails.first_name);
      setLastName(userDetails.last_name);
      setEmail(userDetails.email);
      setProfileImage(userDetails.profile_image);
    }
  }, [userInfo, userDetails, userUpdateStatus]);

  useEffect(() => {
    dispatch(fetchGetAllOrders(keyword));
  }, [dispatch, keyword]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setProfileImage(file);
    } else {
      toast.success("Please select an image file");
    }
  };

  const updateHandler = (e) => {
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
    } else {
      dispatch(
        fetchUserUpdate({
          id: userDetails.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          profile_image: profileImage,
        })
      );
    }
  };
  return (
    <div className="w-[95%] min-h-[80vh] mx-auto border-2 rounded-lg backdrop-blur bg-background/50">
      <div className="w-full flex-grow lg:flex">
        <div className="w-[98%] m-3 mx-auto lg:mx-3 lg:w-2/5 border-2 rounded-lg backdrop-blur bg-background/50">
          <h1 className="text-2xl font-bold text-center my-4">Profile</h1>
          <div className="flex-col mx-6 my-4 space-y-2">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={userDetails.profile_image} />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <p className="text-base lg:text-lg text-center">
              Name: {userDetails.first_name} {userDetails.last_name}
            </p>
            <p className="text-base lg:text-lg text-center">
              Email: {userDetails.email}
            </p>
            <p className="text-base lg:text-lg text-center">
              Verified: {userDetails.is_verified ? "Yes" : "No"}
            </p>
          </div>
          <div className="mx-6 my-4 space-y-4">
            <h1 className="text-2xl font-bold text-center my-4 ">
              Update Profile
            </h1>
            <h3 className="text-center">
              if you don't want to change image or password just leave it blank
            </h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName || ""}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName || ""}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email || ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-image">Profile Image</Label>
                <input
                  type="file"
                  name="image"
                  id="image-upload"
                  accept="image/*"
                  label="Upload Image"
                  onChange={(e) => imageHandler(e)}
                  className="block w-full text-primary font-semibold file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground file:hover:cursor-pointer hover:file:bg-primary/90  file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer"
                />
              </div>
              <CustomPassword
                id="password"
                label="Password"
                placeholder="Password"
                change={(e) => setPassword(e.target.value)}
              />
              <CustomPassword
                id="confirm-password"
                label="Confirm Password"
                placeholder="Confirm Password"
                change={(e) => setConfirmPassword(e.target.value)}
              />
              <Button onClick={updateHandler} className="w-full">
                Update
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[98%] m-3 mx-auto lg:mx-3 lg:w-3/5 border-2 rounded-lg backdrop-blur bg-background/50">
          <h1 className="text-2xl font-bold text-center my-4">Orders</h1>
          <div>
            <Table>
              <TableCaption>
                {pages > 1 && (
                  <CustomPagination
                    keyword="?page="
                    page={currentPage}
                    pages={pages}
                    link="/profile"
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                )}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Purchase Date
                  </TableHead>
                  <TableHead>Delivered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium truncate">
                      <Link
                        to={`/order/${order.id}`}
                        className="hover:underline"
                      >
                        <div className="font-medium ">{order.id}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="text-base font-bold">₹&nbsp;</span>
                      {order.total_price ? Math.round(order.total_price) : 0}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.created_at.substring(0, 10)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="text-xs"
                        variant={order.is_delivered ? "default" : "secondary"}
                      >
                        {order.is_delivered ? "Delivered" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
