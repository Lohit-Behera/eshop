import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";

function VerificationPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center ">
      <Card className="w-[350px] bg-background/70">
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
            <LogIn className="mr-2 w-4 h-4" /> LogIn
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerificationPage;
