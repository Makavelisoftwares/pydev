import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import { Image, MessageCircleCode, ThumbsUp } from "lucide-react";
import Link from "next/link";

export const YourForums = async () => {
  const { userId } = auth();

  const forums = await db.forum.findMany({
    where: {
      authorId: userId,
    },
    include: {
      Like: true,
      reply: true,
    },
    orderBy:{
      createdAt:"desc"
    }
  });


  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle className="text-lg ">Your forums</CardTitle>
        <CardDescription>
          This section displays all your forums you recently created
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {forums?.map((item, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between p-3">
              <div>
                <div className="text-sm font-extrabold">{item.name}</div>
                {item?.image_url && (
                  <div className="flex items-center space-x-2">
                    <Image className="text-sky-400" />
                    <Link
                      href={item?.image_url}
                      target="_blank"
                      className="text-xs hover:underline"
                    >
                      {item?.image_url}
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="text-zinc-500"/>
                  <div>{item?.Like?.length}</div>
                </div>
                <Link href={`/forums/${item?.id}`} target="_blank">
                  <div className="flex items-center space-x-2">
                    <MessageCircleCode className="text-zinc-500"/>
                    <div>{item?.reply?.length}</div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
