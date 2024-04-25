import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/features/UserSlice";
import DarkModeToggle from "./DarkModeToggle";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Logo from "../assets/Logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetails = useSelector((state) => state.user.userDetails);
  const profileImage = userDetails ? userDetails.profile_image : "";

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="z-20 w-full sticky top-0 mb-1 backdrop-blur bg-white/50 dark:bg-[#030712]/50 shadow  ">
      <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-4 md:font-semibold">
        <div className="flex justify-between w-[95%] mx-auto py-3 md:py-3">
          <div className="hidden md:block">
            <div>
              <ul className="flex space-x-3">
                <li>
                  <Link to="/">
                    <Avatar>
                      <AvatarImage src={Logo} />
                      <AvatarFallback>ES</AvatarFallback>
                    </Avatar>
                  </Link>
                </li>
                <li>
                  <NavLink to="/">
                    {({ isActive, isPending, isTransitioning }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        disabled={isPending || isTransitioning}
                      >
                        Home
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contactus">
                    {({ isActive, isPending, isTransitioning }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        disabled={isPending || isTransitioning}
                      >
                        Contact Us
                      </Button>
                    )}
                  </NavLink>
                </li>
                {userInfo ? (
                  <li>
                    <Button variant="ghost" onClick={logoutHandler}>
                      Log Out
                    </Button>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/login">
                      {({ isActive, isPending, isTransitioning }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          disabled={isPending || isTransitioning}
                        >
                          Login
                        </Button>
                      )}
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="block md:hidden mt-1">
            <Sheet>
              <SheetTrigger>
                <Menu color="#3b82f6" />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="items-center">
                  <SheetTitle>
                    <Avatar>
                      <AvatarImage src={Logo} />
                      <AvatarFallback>MP</AvatarFallback>
                    </Avatar>
                  </SheetTitle>
                  <SheetDescription>
                    <div>
                      <ul className="space-y-4">
                        <li>
                          <NavLink to="/">
                            {({ isActive, isPending, isTransitioning }) => (
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                disabled={isPending || isTransitioning}
                              >
                                Home
                              </Button>
                            )}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/contactus">
                            {({ isActive, isPending, isTransitioning }) => (
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                disabled={isPending || isTransitioning}
                              >
                                Contact Us
                              </Button>
                            )}
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <div>
            <ul className="flex">
              {userInfo && (
                <li className="mr-3">
                  <Link to="/profile">
                    <Avatar>
                      <AvatarImage src={profileImage} />
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                  </Link>
                </li>
              )}
              <li className="mt-0.5">
                <DarkModeToggle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
