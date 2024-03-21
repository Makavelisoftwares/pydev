import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const { forum_id, message } = await req.json();

    await db.reply.create({
      data: {
        message,
        forumId: forum_id,
        replierId: userId,
      },
    });

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
