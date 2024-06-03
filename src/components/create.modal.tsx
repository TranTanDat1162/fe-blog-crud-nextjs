"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { mutate } from "swr";

const CreateModal = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("Data added: ", title, author, content);

    // Validate to check empty for title, author and content properties
    if (!title) {
      toast({
        title: "Please fill title",
        description: "Please fill title for the blog",
        variant: "warning",
      });
      return;
    }
    if (!author) {
      toast({
        title: "Please fill author",
        description: "Please fill author for the blog",
        variant: "warning",
      });
      return;
    }
    if (!content) {
      toast({
        title: "Please fill content",
        description: "Please fill content for the blog",
        variant: "warning",
      });
      return;
    }

    // Fetch API POST to add blog
    fetch(`${process.env.PATH_URL_BACKEND}/api/blogs`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        // If data added successfully
        if (res) {
          // Display a toast notification
          toast({
            title: "Blog Added",
            description: "Your new blog post has been successfully added.",
            variant: "success",
          });
          handleCloseModal();
          // When added, it automatically appears to main page with data added.
          mutate(`${process.env.PATH_URL_BACKEND}/api/blogs`);
        }
      });
  };

  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseModal();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className="flex mr-auto justify-content: flex-end" asChild>
        <Button variant="default">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Blog</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              className="col-span-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              className="col-span-4"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              className="col-span-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add New
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
