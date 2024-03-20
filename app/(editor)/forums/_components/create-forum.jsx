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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

import { Button } from "@/components/ui/button";
import { Loader, MessageCirclePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useExitModal } from "@/lib/store";

export const CreateForum = () => {
  const [isMounted, setisMounted] = useState(false);
  const [image, setimage] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  // const { isOpen, close, open } = useExitModal();

  const { refresh } = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    try {
      setisSubmitting(true);

      await axios.post("/api/forum", {
        image,
        description: values.description,
        name: values.name,
      });

      toast.success("forum created successful");

      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AlertDialog className="w-[1000px]">
      <AlertDialogTrigger className="flex justify-end w-full">
        <div>
          <Button
            size="sm"
            className="flex items-center space-x-2 active:border-b-4 active:border-rose-200 bg-rose-500 hover:bg-rose-500"
          >
            <MessageCirclePlus />
            <div>start forum</div>
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Forum creation</AlertDialogTitle>
          <AlertDialogDescription>
            Provide a problem statement(title) for the forum. Provide a detailed
            description of the forum you need to conduct . You can share coding
            snippet by upload an image(optional) of the coding problem. When
            uploading an image ensure to click the "upload button" before
            clicking the "conduct forum" button.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ScrollArea className="w-full h-[50vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forum statement</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Help me understand the print function in python.."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a short statement (like a title).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forum description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain to me the core concept of the print function."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {image ? (
                <div className="p-2 relative rounded-sm shadow-sm border border-gray-400/30 bg-sky-100">
                  <Link
                    className="hover:underline text-sky-600 text-sm"
                    href={image}
                    target="_blank"
                    alt={image}
                  >
                    {image}
                  </Link>

                  <div className="absolute bg-rose-500 right-2 -top-2 h-[25px] w-[25px] rounded-full">
                    <X
                      onClick={() => setimage("")}
                      className="cursor-pointer h-[25px] text-white w-[25px] rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="image_url"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res[0].url);
                    toast.success("upload completed");
                    setimage(res[0].url);
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}

              <AlertDialogFooter>
                <div className="flex items-center justify-end space-x-2">
                  
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction disabled={isSubmitting} type="submit">
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <Loader className="animate-spin" />
                        <div>creating...</div>
                      </div>
                    ) : (
                      "create"
                    )}
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};
