"use client";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import clsx from "clsx";

const ViewDetailedBlog = ({ params }: { params: { id: number } }) => {
  const { theme } = useTheme();

  // Purpose for suggesting data from Blog interface
  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://pure-enthusiasm-production.up.railway.app/api/blogs/${params.id}`,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        Something went wrong...
      </div>
    );
  }

  return (
    <div
      className={clsx("container mx-auto py-16 px-4 mt-10", {
        "bg-gray-100 text-gray-900": theme === "light",
        "bg-gray-900 text-gray-100": theme === "dark",
      })}
    >
      <Link
        href="/blogs"
        className={clsx("flex items-center mb-4", {
          "text-blue-600 hover:text-blue-800": theme === "light",
          "text-blue-300 hover:text-blue-500": theme === "dark",
        })}
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Blog List
      </Link>
      <h1 className="text-3xl font-bold mb-4 px-3 py-3">Blog Details</h1>
      <div
        className={clsx("p-6 rounded-lg shadow-lg", {
          "bg-white text-gray-900": theme === "light",
          "bg-gray-800 text-gray-100": theme === "dark",
        })}
      >
        <h2 className="text-2xl font-semibold mb-2">{data?.title}</h2>
        <p className="mb-4">by {data?.author}</p>
        <div>{data?.content}</div>
      </div>
    </div>
  );
};

export default ViewDetailedBlog;
