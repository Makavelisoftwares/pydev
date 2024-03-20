import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import { MessageCircleCode, ThumbsUp } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { LikeForum } from "./like-forum";

export const JoinForum = async () => {
  const forums = await db.forum.findMany({
    include: {
      author: true,
      Like: true,
      reply: true,
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-3 space-y-2">
        {forums?.map((item, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">{item?.name}</CardTitle>
              <CardDescription>{item?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {item?.image_url && (
                <div className="relative aspect-video ">
                  <Image
                    src={item?.image_url}
                    alt={item?.image_url}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </CardContent>

            <CardFooter>
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={item?.author?.image} alt="profile" />
                    <AvatarFallback className="uppercase">
                      {item?.author?.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="text-sm font-bold">
                      {item?.author?.name}
                    </div>
                    <div className="text-neutral-400 text-xs">
                      {moment(item?.createdAt).fromNow()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <LikeForum id={item?.id} count={item?.Like?.length} />

                  <div>
                    <Link
                      href={`/forums/${item?.id}`}
                      className="flex items-center space-x-2"
                    >
                      <MessageCircleCode className="cursor-pointer" />
                      <div>{item?.reply?.length}</div>
                    </Link>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
