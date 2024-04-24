import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
