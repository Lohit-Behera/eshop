import React from "react";
import { useNavigate } from "react-router-dom";
import { resetRegister } from "@/features/UserSlice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function VerificationPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We send you an email to verify your account</p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              navigate("/login");
            }}
          >
            LogIn
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerificationPage;
