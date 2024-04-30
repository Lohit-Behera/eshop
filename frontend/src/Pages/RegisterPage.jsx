import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister, resetRegister } from "@/features/UserSlice";
import CustomPassword from "@/components/CustomPassword";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import ServerError from "./ServerError";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerStatus = useSelector((state) => state.user.registerStatus);

  useEffect(() => {
    if (registerStatus === "succeeded") {
      navigate("/verification");
      toast.success("Registration successful");
      dispatch(resetRegister());
    } else if (registerStatus === "failed") {
      toast.error("Something went wrong!");
      dispatch(resetRegister());
    }
  }, [registerStatus, navigate]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
    } else if (!firstName || !lastName || !email || !password) {
      toast.warning("Please fill in all fields");
    } else {
      dispatch(
        fetchRegister({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <div className="min-h-[80vh]">
      {registerStatus === "loading" ? (
        <Loader hight="min-h-screen" />
      ) : registerStatus === "failed" ? (
        <ServerError />
      ) : (
        <div className="mt-20">
          <Card className="mx-auto max-w-sm bg-background/70">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-center">
                Sign Up
              </CardTitle>
              <CardDescription className="md:text-base">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => submitHandler(e)}>
                <div className="grid gap-4 text-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label className="md:text-base" htmlFor="first-name">
                        First name
                      </Label>
                      <Input
                        className="md:text-base"
                        id="first-name"
                        placeholder="First Name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="md:text-base" htmlFor="last-name">
                        Last name
                      </Label>
                      <Input
                        className="md:text-base"
                        id="last-name"
                        placeholder="Last Name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="md:text-base" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      className="md:text-base"
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <CustomPassword
                    id="password"
                    placeholder={"Password"}
                    label={"Password"}
                    change={(e) => setPassword(e.target.value)}
                  />
                  <CustomPassword
                    id="confirm-password"
                    placeholder={"Confirm Password"}
                    label={"Confirm Password"}
                    change={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button className="w-full md:text-base">
                    Create an account
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
