"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Wait until theme is mounted

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Providers;
