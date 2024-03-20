import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const { forum_id } = await req.json();

    await db.like.create({
      data: {
        forumId: forum_id,
        likerId: userId,
      },
    });

    return NextResponse.json("forum liked", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
