"use client";

import axios from "axios";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LikeForum = ({ id, count }) => {

    const {refresh}=useRouter()


  const handleLike = async () => {
    try {
      await axios.post("/api/like", {
        forum_id: id,
      });

      toast.success("Liked forum")
      refresh()

    } catch (error) {
        console.log(error)
        toast.error(error.response.data)
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <ThumbsUp onClick={handleLike} className="cursor-pointer" />
      <div>{count}</div>
    </div>
  );
};
