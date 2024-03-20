import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { name, description, image } = await req.json();
    const { userId } = auth();

    await db.forum.create({
      data: {
        description,
        name,
        image_url: image,
        authorId:userId
      },
    });

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log("FAILED CREATING FORUM",error);
  }
};
