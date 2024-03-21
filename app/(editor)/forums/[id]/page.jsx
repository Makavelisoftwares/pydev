import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db/db";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReplyForm } from "../_components/create-reply";
import { AllReplies } from "../_components/replied-forum";

async function ForumIdPage({ params }) {
  const id = params.id;

  const forum = await db.forum.findUnique({
    where: {
      id,
    },
  });

  return (
    <div>
      <Button asChild size="sm" variant="ghost" className="mt-2">
        <Link href="/forums" className="flex items-center space-x-2">
          <ArrowLeftCircle />
          <div>Back</div>
        </Link>
      </Button>
      <Card className="my-3">
        <CardHeader>
          <CardTitle>{forum?.name}</CardTitle>
          <CardDescription>{forum?.description}</CardDescription>
        </CardHeader>
      </Card>
      <div className={cn("my-4", forum?.image_url && "grid grid-cols-4 gap-2")}>
        {forum?.image_url && (
          <div className="col-span-3">
            <div className="relative aspect-video">
              <Image
                src={forum?.image_url}
                alt={forum?.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="col-span-1 p-2 relative border border-zinc-200">
          <ScrollArea className="w-full h-[55vh]">
            <div>
              <AllReplies id={id}/>
            </div>
          </ScrollArea>
          <div className="absolute bottom-0 right-0 left-0">
            <ReplyForm id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumIdPage;
