import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db/db";
import { MessageCircleCode } from "lucide-react";
import moment from "moment";

export const AllReplies = async ({ id }) => {
  const replies = await db.reply.findMany({
    where: {
      forumId: id,
    },
    include: {
      replier: true,
    },
  });

  return (
    <div>
      {replies?.length < 1 ? (
        <div className="flex items-center space-y-3 flex-col">
          <MessageCircleCode />
          <div className="text-xs text-zinc-500 text-center">
            This forum has no discussion yet. Be the first one.
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {replies.map((item, i) => (
            <Card key={i} className="p-1 shadow-none">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage alt="profile" src={item?.replier?.image} />
                  <AvatarFallback>{item?.replier?.name[0]}</AvatarFallback>
                </Avatar>

                <div>
                  <div className="font-bold text-sm">{item?.replier?.name}</div>
                  <div className="text-xs text-zinc-400">
                    {moment(item?.createdAt).fromNow()}
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-600 mt-1">{item?.message}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
