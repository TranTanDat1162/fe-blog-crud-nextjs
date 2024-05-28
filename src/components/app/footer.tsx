"use client";

import { useTheme } from "next-themes";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Wait until theme is mounted

  return (
    <footer
      className={clsx(
        "container mt-10 mx-auto flex justify-center items-center py-4",
        {
          "bg-gray-200 text-gray-800": theme === "light",
          "bg-gray-800 text-white": theme === "dark",
        }
      )}
    >
      <p className="text-lg font-medium">This is footer</p>
    </footer>
  );
};

export default Footer;
