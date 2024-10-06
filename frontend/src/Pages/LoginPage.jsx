import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchLogin } from "@/features/UserSlice";

import CustomPassword from "@/components/CustomPassword";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userInfoStatus = useSelector((state) => state.user.userInfoStatus);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (userInfoStatus === "succeeded") {
      navigate("/");
    }
  }, [userInfoStatus, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    const loginPromise = dispatch(
      fetchLogin({
        email: email,
        password: password,
      })
    ).unwrap();
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Logged in successfully",
      error: (error) => {
        return error === "Request failed with status code 401"
          ? "Invalid email or password"
          : "Something went wrong";
      },
    });
  };

  return (
    <>
      <div className="w-full flex justify-center items-center min-h-[80vh] ">
        <Card className="mx-auto max-w-sm mb-56 bg-background/70">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Login</CardTitle>
            <CardDescription className="md:text-base">
              Enter your information to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="md:text-base" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <CustomPassword
                id="password"
                label="Password"
                placeholder="Password"
                change={(e) => setPassword(e.target.value)}
              />
              <Button onClick={loginHandler} className="w-full md:text-base'">
                <LogIn className="mr-2 w-4 h-4" />
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
