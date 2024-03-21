import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db";
import moment from "moment";
import Link from "next/link";
import React from "react";

async function RecentCodePage() {
  const snippets = await db.code.findMany({
    include: {
      programmer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle>Recent programs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {snippets?.map((item, i) => (
          <Card className="hover:border hover:border-rose-300" key={i}>
            <Link href={`/recent/${item?.id}`}>
              <CardHeader>
                <CardTitle>{item?.title}</CardTitle>
                <CardDescription className="flex items-center space-x-3">
                  <div>{item?.programmer?.name}</div>
                  <div>{moment(item?.createdAt).fromNow()}</div>
                </CardDescription>
                <CardContent>
                  <Card>
                    <CardContent className="p-3">
                      <pre lang="python">
                        <code>{item?.code}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </CardContent>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentCodePage;
