import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserUpdate } from "@/features/UserSlice";
import CustomPassword from "@/components/CustomPassword";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetails = useSelector((state) => state.user.userDetails) || {};
  const userUpdateStatus = useSelector((state) => state.user.userUpdateStatus);
  const getAllOrders = useSelector((state) => state.order.getAllOrders) || [];
  console.log(getAllOrders);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (userUpdateStatus === "succeeded") {
      window.location.reload();
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

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setProfileImage(file);
    } else {
      alert("Please select an image file");
    }
  };

  const updateHandler = (e) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
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
    <div className="w-[95%] mx-auto border-2 rounded-lg">
      <div className="w-full flex-grow lg:flex">
        <div className="w-[98%] m-3 mx-auto lg:mx-3 lg:w-2/5 border-2 rounded-lg ">
          <h1 className="text-2xl font-bold text-center my-4">Profile</h1>
          <div className="flex-col mx-6 my-4 space-y-2">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={userDetails.profile_image} />
              <AvatarFallback>CN</AvatarFallback>
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
                  className="block w-full text-white
                                        file:me-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-[#3b82f6] file:text-white
                                        hover:file:bg-[#306dd0]
                                        file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer"
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
        <div className="w-[98%] m-3 mx-auto lg:mx-3 lg:w-3/5 border-2 rounded-lg">
          <h1 className="text-2xl font-bold text-center my-4">Orders</h1>
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order Id</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead className="w-[100px]">Shipping Price</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Deliver Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getAllOrders.map((order) => (
                  <TableRow>
                    <TableCell className="font-medium truncate">
                      <Link
                        to={`/order/${order.id}`}
                        className="hover:underline"
                      >
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell>{order.created_at.substring(0, 10)}</TableCell>
                    <TableCell>
                      <span className="text-base font-bold">₹&nbsp;</span>
                      {order.total_price ? Math.round(order.total_price) : 0}
                    </TableCell>
                    <TableCell>
                      {order.shipping_price < 1 ? "Free" : order.shipping_price}
                    </TableCell>
                    <TableCell>{order.is_paid ? "Yes" : "No"}</TableCell>
                    <TableCell>{order.is_delivered ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {order.is_delivered
                        ? order.delivered_at.substring(0, 10)
                        : ""}
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
