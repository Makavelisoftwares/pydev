"use client";

import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string(),
});

export const SaveCode = ({ code }) => {
  const [isMounted, setisMounted] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  const { refresh } = useRouter();


  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    console.log(values);

    try {
      setisSubmitting(true);

      await axios.post("/api/recent", {
        code,
        title: values.title,
      });

      toast.success("snippet successfully saved");

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
    <Dialog>
      <DialogTrigger>
        <Button
          className="bg-sky-500 flex items-center space-x-2 hover:bg-sky-500"
          size="sm"
          onClick={() => {}}
        >
          <Save />
          <div>Save</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save your code snippet</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code title</FormLabel>
                  <FormControl>
                    <Input placeholder="python script" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <div>
                  <Loader className="animate-spin" />
                </div>
              ) : (
                "save snippet"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
