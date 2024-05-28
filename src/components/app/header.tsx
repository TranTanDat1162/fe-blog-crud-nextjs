"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ThemeButton from "@/components/themeButton";
import { useTheme } from "next-themes";
import clsx from "clsx";

const Header = () => {
  const { theme } = useTheme();

  return (
    <nav
      className={clsx(`sticky top-0 z-50 border-b border-gray-200 shadow-sm`, {
        "bg-gray-100": theme === "light",
        "bg-gray-900": theme === "dark",
      })}
    >
      {" "}
      {/* Apply theme class */}
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          {/* <Image src="./" alt="Logo" width={40} height={40} className="mr-3" /> */}
          <Link
            href="/"
            className={clsx("font-semibold p-3", {
              "text-gray-700": theme === "light",
              "text-gray-300": theme === "dark",
            })}
          >
            {" "}
            {/* Use theme color for text */}
            Blog Demo
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/blogs"
            className={clsx("p-3", {
              "text-gray-600 hover:text-gray-900": theme === "light",
              "text-gray-400 hover:text-gray-500": theme === "dark",
            })}
          >
            {" "}
            {/* Use theme color for text and hover text */}
            Blogs
          </Link>
        </div>
        <ThemeButton /> {/* Place theme button on the right */}
      </div>
    </nav>
  );
};

export default Header;
