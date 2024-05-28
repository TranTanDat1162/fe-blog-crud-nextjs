"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import CreateModal from "@/components/create.modal";
import UpdateModal from "../edit.modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteModal } from "../delete.modal";

interface Iprops {
  blogs: IBlog[];
}

const TableDemo = (props: Iprops) => {
  const { blogs } = props;

  const router = useRouter();

  return (
    <div className="container mt-10 px-4 py-2">
      <div className="flex">
        <h1 className="container font-bold text-lg">TABLE BLOGS</h1>
        <CreateModal />
      </div>
      <Table>
        <TableCaption>A list of your blogs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item?.title}</TableCell>
              <TableCell>{item?.author}</TableCell>
              <TableCell className="truncate">{item?.content}</TableCell>
              <TableCell className="flex">
                <Button
                  onClick={() => {
                    router.push(`blogs/${item?.id}`);
                  }}
                  className="bg-cyan-400 hover:bg-cyan-500 mx-3"
                >
                  <Link href={`blogs/${item?.id}`}>View</Link>
                </Button>
                <UpdateModal blog={item} />
                <DeleteModal id={item?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDemo;
