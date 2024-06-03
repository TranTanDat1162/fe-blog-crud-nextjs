"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mutate } from "swr";

export function DeleteModal({ id }: { id: number }) {
  const { toast } = useToast();

  const handleDeletebtn = async (id: number) => {
    // Fetch API PUT to edit blog with id
    fetch(`${process.env.PATH_URL_BACKEND}/api/blogs/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      // If data added successfully
      if (res) {
        // Display a toast notification
        toast({
          title: "Blog Deleted",
          description: "Delete blog succesfully",
          variant: "success",
        });
        // When added, it automatically appears to main page with data added.
        mutate(`${process.env.PATH_URL_BACKEND}/api/blogs`);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-400 hover:bg-red-500 mx-3" asChild>
        <Button variant="default">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete your blog with ID = {id} permanently
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeletebtn(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
