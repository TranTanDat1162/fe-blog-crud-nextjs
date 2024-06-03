"use client";

import TableDemo from "@/components/app/table";
import useSWR from "swr";

const BlogPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.PATH_URL_BACKEND}/api/blogs`,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something wrong...</div>;
  }

  return (
    <div className="container">
      {/* //* Sort Table for decreasing id */}
      <TableDemo blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </div>
  );
};

export default BlogPage;
