import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog List",
  description: "This is Blog List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
