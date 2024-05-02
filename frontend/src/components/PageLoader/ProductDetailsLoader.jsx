import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./LoaderAnimator.css";

function ProductDetailsLoader() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mode = useSelector((state) => state.mode.mode);
  useEffect(() => {
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme =
      mode === "dark"
        ? "dark"
        : systemTheme && mode === "system"
        ? "dark"
        : "light";
    setIsDarkMode(theme === "dark");
  }, [mode]);
  return (
    <div
      className={`loader-page ${
        isDarkMode ? "loader-page-dark" : ""
      } w-full bg-background/50 `}
    >
      <div className="flex-grow md:flex justify-center w-[96%] mx-auto space-x-5">
        <div className="bg-primary/70 w-[95%] md:w-[42%] h-128 my-7 rounded-lg m-4"></div>
        <div className="w-[95%] md:w-[46%] mx-auto m-4 space-y-4">
          <div className="bg-primary/70 w-[10%] h-3 rounded-lg"></div>
          <div className="bg-primary/70 w-full h-8 rounded-lg"></div>
          <div className=" bg-primary/70 w-[35%] h-6 rounded-lg"></div>
          <div className=" bg-primary/70 w-[20%] h-6 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className=" bg-primary/70 w-full h-3 rounded-lg"></div>
          <div className="w-full flex justify-between">
            <div className="bg-primary/70 w-[20%] h-5 rounded-lg"></div>
            <div className="bg-primary/70 w-[20%] h-5 rounded-lg"></div>
          </div>
          <div className="w-full flex justify-between">
            <div className="bg-primary/70 w-[20%] h-5 rounded-lg"></div>
            <div className="bg-primary/70 w-[20%] h-5 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsLoader;
