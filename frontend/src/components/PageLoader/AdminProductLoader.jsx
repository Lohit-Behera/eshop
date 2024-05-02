import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./LoaderAnimator.css";

function AdminProductLoader() {
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
      } w-full mt-8 space-y-8`}
    >
      <div className="w-[15%] h-8 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-6 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="w-[98%] h-10 bg-primary/70 rounded-lg mx-auto"></div>
      <div className="flex justify-end">
        <div className="w-[10%] h-10 bg-primary/70 rounded-lg mr-4"></div>
      </div>
    </div>
  );
}

export default AdminProductLoader;
