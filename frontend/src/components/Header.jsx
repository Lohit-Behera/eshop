import React from "react";
import { useState } from "react";
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
  Mails,
  Menu,
  Search,
  ShoppingCart,
  UserCog,
  X,
} from "lucide-react";
import Logo from "../assets/Logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { fetchDeleteImages } from "@/features/DeleteImages";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetails = useSelector((state) => state.user.userDetails);
  const profileImage = userDetails ? userDetails.profile_image : "";

  const [search, setSearch] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !search === "") {
      navigate(`/?search=${search}`);
    }
  };
  const handleClickSearch = (e) => {
    if (!search === "") {
    }
    setSearch(e.target.value);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const deleteImagesHandler = () => {
    dispatch(fetchDeleteImages());
  };

  return (
    <nav className="z-20 w-full sticky top-0 mb-8 backdrop-blur bg-background/50 shadow  ">
      <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-4 md:font-semibold">
        <div className="flex justify-between w-[95%] mx-auto py-3 md:py-3">
          <div className="hidden md:block">
            <div>
              <ul className="flex space-x-3">
                <li>
                  <Link to="/">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="mr-4">
                            <AvatarImage src={Logo} />
                            <AvatarFallback>ES</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>EShop</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </li>
                <li>
                  <NavLink to="/">
                    {({ isActive, isPending, isTransitioning }) => (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={isActive ? "default" : "ghost"}
                              disabled={isPending || isTransitioning}
                              size="icon"
                            >
                              <Home />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Home</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </NavLink>
                </li>
                <li>
                  {userInfo && (
                    <NavLink to="/cart">
                      {({ isActive, isPending, isTransitioning }) => (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                disabled={isPending || isTransitioning}
                                size="icon"
                              >
                                <ShoppingCart />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cart</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </NavLink>
                  )}
                </li>
                <li>
                  <NavLink to="/contact-us">
                    {({ isActive, isPending, isTransitioning }) => (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={isActive ? "default" : "ghost"}
                              disabled={isPending || isTransitioning}
                              size="icon"
                            >
                              <Mail />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Contact Us</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </NavLink>
                </li>
                {userDetails && userDetails.is_staff && (
                  <>
                    <li>
                      <NavLink to="/admin/dashboard">
                        {({ isActive, isPending, isTransitioning }) => (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={isActive ? "default" : "ghost"}
                                  disabled={isPending || isTransitioning}
                                  size="icon"
                                >
                                  <UserCog />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Admin Dashboard</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/contact">
                        {({ isActive, isPending, isTransitioning }) => (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={isActive ? "default" : "ghost"}
                                  disabled={isPending || isTransitioning}
                                  size="icon"
                                >
                                  <Mails />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Admin Queries</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </NavLink>
                    </li>
                  </>
                )}
                {userInfo ? (
                  <li>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            onClick={logoutHandler}
                            size="icon"
                          >
                            <LogOut />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>LogOut</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/login">
                      {({ isActive, isPending, isTransitioning }) => (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                disabled={isPending || isTransitioning}
                                size="icon"
                              >
                                <LogIn />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Log In</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
              <SheetContent side="left" className="w-[50%]">
                <SheetHeader className="items-center">
                  <SheetTitle className="space-y-3">
                    <Avatar className="ml-8 w-16 h-16">
                      <AvatarImage src={Logo} />
                      <AvatarFallback>ES</AvatarFallback>
                    </Avatar>
                    <ul className="space-y-4">
                      <li>
                        <NavLink to="/">
                          {({ isActive, isPending, isTransitioning }) => (
                            <SheetClose asChild>
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                disabled={isPending || isTransitioning}
                              >
                                <Home className="mr-2 h-4 w-4" />
                                Home
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
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" /> Cart
                              </Button>
                            </SheetClose>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact-us">
                          {({ isActive, isPending, isTransitioning }) => (
                            <SheetClose asChild>
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                disabled={isPending || isTransitioning}
                              >
                                <Mail className="mr-2 h-4 w-4" /> Contact Us
                              </Button>
                            </SheetClose>
                          )}
                        </NavLink>
                      </li>
                      {userInfo && userDetails && userDetails.is_staff && (
                        <li>
                          <NavLink to="/admin/dashboard">
                            {({ isActive, isPending, isTransitioning }) => (
                              <SheetClose asChild>
                                <Button
                                  variant={isActive ? "default" : "ghost"}
                                  disabled={isPending || isTransitioning}
                                >
                                  <UserCog className="mr-2 h-4 w-4" />
                                  Admin
                                </Button>
                              </SheetClose>
                            )}
                          </NavLink>
                        </li>
                      )}
                      {userInfo && (
                        <li>
                          <SheetClose asChild>
                            <Button variant="ghost" onClick={logoutHandler}>
                              <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                          </SheetClose>
                        </li>
                      )}
                    </ul>
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div>
            <ul className="flex">
              <li className="mr-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Search />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="search" className="md:text-base">
                        Search
                      </Label>
                      <PopoverPrimitive.Close asChild>
                        <Button variant="ghostTwo" size="iconTwo" className="">
                          <X />
                        </Button>
                      </PopoverPrimitive.Close>
                    </div>
                    <div className="flex h-9 w-full rounded-md border border-input bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground focus-within:ring-1 ring-ring">
                      <Input
                        className="text-sm md:text-base h-auto border-0 focus-visible:outline-none focus-visible:ring-0 bg-background w-full"
                        id="search"
                        type="search"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e)}
                      />
                      <Button
                        variant="ghostTwo"
                        size="iconTwo"
                        onClick={() => navigate(`/?search=${search}`)}
                      >
                        <Search />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
              {userInfo && (
                <li className="mr-3">
                  <Link to="/profile">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar>
                            <AvatarImage src={profileImage} />
                            <AvatarFallback>P</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </li>
              )}
              {!userInfo && (
                <li className="block md:hidden">
                  <NavLink to="/login">
                    {({ isActive, isPending, isTransitioning }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        disabled={isPending || isTransitioning}
                      >
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </Button>
                    )}
                  </NavLink>
                </li>
              )}
              <li className="mt-0.5">
                <DarkModeToggle />
              </li>
              {userInfo && userDetails && userDetails.is_staff && (
                <li className="mt-0.5 ml-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={deleteImagesHandler}
                        >
                          <ImageMinus />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Unused Images</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
