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
import { use, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { mutate } from "swr";

interface Iprops {
  blog: IBlog | null;
  // setBlog: (value: IBlog | null) => void;
}

const UpdateModal = (props: Iprops) => {
  const { toast } = useToast();

  const { blog } = props;
  const [originalBlog, setOriginalBlog] = useState<IBlog | null>(null);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (blog && blog.id) {
      setOriginalBlog(blog);
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog]);

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

    // Fetch API PUT to edit blog with id
    fetch(`http://localhost:8080/api/blogs/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        // If data added successfully
        if (res) {
          // Display a toast notification
          toast({
            title: "Blog Edited",
            description: "Your new blog post has been successfully edited.",
            variant: "success",
          });
          handleCloseModal();
          // When added, it automatically appears to main page with data added.
          mutate("http://localhost:8080/api/blogs");
        }
      });
  };

  const handleCloseModal = () => {
    // setBlog(null);
    setIsOpen(false);
    setTitle(originalBlog?.title || "");
    setAuthor(originalBlog?.author || "");
    setContent(originalBlog?.content || "");
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
      <DialogTrigger asChild>
        <Button
          className="bg-yellow-400 hover:bg-yellow-500 mx-3"
          variant="default"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
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
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
