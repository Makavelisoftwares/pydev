"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  message: z.string(),
});

export const ReplyForm = ({ id }) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const { refresh } = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    try {
      setisSubmitting(true);

      await axios.post("/api/reply", {
        message: values.message,
        forum_id: id,
      });

      toast.success("replied to forum");

      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-2 p-2 flex items-center justify-between"
      >
        <FormField
          control={form.control}
          name="message"
          className=""
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Reply to this forum..."
                  className="w-full "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="destructive"
          type="submit"
          size="sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader className="animate-spin" /> : <Send />}
        </Button>
      </form>
    </Form>
  );
};
