import React from "react";
import { YourForums } from "./_components/your-forums";
import { CreateForum } from "./_components/create-forum";
import { JoinForum } from "./_components/join-forum";

function ForumPage() {
  return (
    <div>
      <div className="mt-3">
        <CreateForum />
      </div>
      <div>
        <YourForums />
      </div>

      <div className="mt-3">
        <JoinForum />
      </div>
    </div>
  );
}

export default ForumPage;
