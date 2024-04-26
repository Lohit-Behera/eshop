import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/features/UserSlice";
import DarkModeToggle from "./DarkModeToggle";
import { Button } from "./ui/button";
import {
  Home,
  ImageMinus,
  LogIn,
  LogOut,
  Mail,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import Logo from "../assets/Logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchDeleteImages } from "@/features/DeleteImages";

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

  const deleteImagesHandler = () => {
    dispatch(fetchDeleteImages());
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
                        size="icon"
                      >
                        <Home />
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  {userInfo && (
                    <NavLink to="/cart">
                      {({ isActive, isPending, isTransitioning }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          disabled={isPending || isTransitioning}
                          size="icon"
                        >
                          <ShoppingCart />
                        </Button>
                      )}
                    </NavLink>
                  )}
                </li>
                <li>
                  <NavLink to="/contactus">
                    {({ isActive, isPending, isTransitioning }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        disabled={isPending || isTransitioning}
                        size="icon"
                      >
                        <Mail />
                      </Button>
                    )}
                  </NavLink>
                </li>
                {userDetails && userDetails.is_staff && (
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <UserCog />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-center">
                        <DropdownMenuLabel>Admin</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link to="/user/dashboard">User Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/product/dashboard">Product Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/order/dashboard">Order Dashboard</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                )}
                {userInfo ? (
                  <li>
                    <Button variant="ghost" onClick={logoutHandler} size="icon">
                      <LogOut />
                    </Button>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/login">
                      {({ isActive, isPending, isTransitioning }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          disabled={isPending || isTransitioning}
                          size="icon"
                        >
                          <LogIn />
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
              <SheetContent side="left" className="w-[30%]">
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
                              <SheetClose asChild>
                                <Button
                                  variant={isActive ? "default" : "ghost"}
                                  disabled={isPending || isTransitioning}
                                  size="icon"
                                >
                                  <Home />
                                </Button>
                              </SheetClose>
                            )}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/cart">
                            {({ isActive, isPending, isTransitioning }) => (
                              <SheetClose asChild>
                                <Button
                                  variant={isActive ? "default" : "ghost"}
                                  disabled={isPending || isTransitioning}
                                  size="icon"
                                >
                                  <ShoppingCart />
                                </Button>
                              </SheetClose>
                            )}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/contactus">
                            {({ isActive, isPending, isTransitioning }) => (
                              <SheetClose asChild>
                                <Button
                                  variant={isActive ? "default" : "ghost"}
                                  disabled={isPending || isTransitioning}
                                  size="icon"
                                >
                                  <Mail />
                                </Button>
                              </SheetClose>
                            )}
                          </NavLink>
                        </li>
                        {userDetails && userDetails.is_staff && (
                          <li>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <UserCog />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="text-center">
                                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <SheetClose asChild>
                                    <Link to="/user/dashboard">
                                      User Dashboard
                                    </Link>
                                  </SheetClose>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <SheetClose asChild>
                                    <Link to="/product/dashboard">
                                      Product Dashboard
                                    </Link>
                                  </SheetClose>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <SheetClose asChild>
                                    <Link to="/order/dashboard">
                                      Order Dashboard
                                    </Link>
                                  </SheetClose>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </li>
                        )}
                        {userInfo ? (
                          <li>
                            <SheetClose asChild>
                              <Button
                                variant="ghost"
                                onClick={logoutHandler}
                                size="icon"
                              >
                                <LogOut />
                              </Button>
                            </SheetClose>
                          </li>
                        ) : (
                          <li>
                            <NavLink to="/login">
                              {({ isActive, isPending, isTransitioning }) => (
                                <SheetClose asChild>
                                  <Button
                                    variant={isActive ? "default" : "ghost"}
                                    disabled={isPending || isTransitioning}
                                    size="icon"
                                  >
                                    <LogIn />
                                  </Button>
                                </SheetClose>
                              )}
                            </NavLink>
                          </li>
                        )}
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
              {userDetails && userDetails.is_staff && (
                <li className="mt-0.5 ml-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={deleteImagesHandler}
                  >
                    <ImageMinus />
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
