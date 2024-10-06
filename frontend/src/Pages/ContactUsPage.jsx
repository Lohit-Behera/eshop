import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactUs, resetContactUs } from "@/features/ContactUsSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/Loader/Loader";
import ServerError from "@/Pages/ServerError";
import SuccessContactUs from "@/components/SuccessContactUs";
import { toast } from "sonner";

function ContactUsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contactusStatus = useSelector(
    (state) => state.contactUs.contactusStatus
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (contactusStatus === "succeeded") {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  }, [contactusStatus]);

  const contactHandler = () => {
    if (name === "" && email === "" && subject === "" && message === "") {
      toast.warning("Please fill all the fields");
    } else {
      const contactPromise = dispatch(
        fetchContactUs({ name, email, subject, message })
      ).unwrap();
      toast.promise(contactPromise, {
        loading: "Sending message...",
        success: "Message sent successfully",
        error: "Failed to send message",
      });
    }
  };

  const resetHandler = () => {
    dispatch(resetContactUs());
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    navigate("/");
  };
  return (
    <div className="min-h-[80vh] w-[95%] md:w-[70%] mx-auto bg-background/50">
      {contactusStatus === "idle" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl text-center">
              Contact Us
            </CardTitle>
            <CardDescription className="">
              Please take a moment to get in touch, we will get back to you
              shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  required
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="problem">What can we help you with?</Label>
                <Textarea
                  id="problem"
                  required
                  placeholder="Explain your problem"
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none"
                  rows={14}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={contactHandler} className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : contactusStatus === "loading" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl text-center">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Loader />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ) : contactusStatus === "failed" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl text-center">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ServerError />
          </CardContent>
          <CardFooter>
            <Button onClick={resetHandler} className="w-full">
              Go Home
            </Button>
          </CardFooter>
        </Card>
      ) : contactusStatus === "succeeded" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl text-center">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SuccessContactUs />
          </CardContent>
          <CardFooter>
            <Button onClick={resetHandler} className="w-full">
              Go Home
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  );
}

export default ContactUsPage;
