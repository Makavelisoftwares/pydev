import React from "react";
import { Header } from "./(editor)/_components/header";
import { LottieFile } from "./(editor)/_components/lottie-animation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

async function Home() {
  const { userId } = auth();

  return (
    <div className="w-[1000px] m-auto">
      <div className="border-b border-neutral-200/50 p-5 ">
        <Header />
      </div>

      <div className="mt-6">
        <div className="flex flex-col w-[700px] m-auto space-y-5 text-center">
          <div className="text-3xl font-extrabold">
            Upgrade Your Python skills with the new python IDE.
          </div>

          <div className="text-sm leading-7">
            Join millions of python skilled developers and programmers on our
            provided forums .Click on the{" "}
            <Link href="/forums" className="text-sky-500">
              Forums
            </Link>{" "}
            link and start shairing your development experience.
          </div>

          {userId == null ? (
            <Button asChild variant="destructive" className="w-[200px] m-auto">
              <Link href="/sign-in">Login</Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="destructive"
              className="w-[200px] animate-pulse m-auto"
            >
              <Link href="/editor">Start Coding</Link>
            </Button>
          )}
        </div>
        <LottieFile />
      </div>
    </div>
  );
}

export default Home;
