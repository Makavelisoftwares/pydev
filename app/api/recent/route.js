import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const { code, title } = await req.json();

    await db.code.create({
      data: {
        code,
        title,
        programmerId: userId,
      },
    });

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
