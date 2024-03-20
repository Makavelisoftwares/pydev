import React from "react";
import { Header } from "./_components/header";
import { CheckUser } from "@/lib/db/check-user";

async function EditorLayout({ children }) {
  const { user } = await CheckUser();

  return (
    <div className="w-[1000px] m-auto">
      <div className="border-b border-neutral-200/50 p-5 ">
        <Header />
      </div>
      {children}
    </div>
  );
}

export default EditorLayout;
