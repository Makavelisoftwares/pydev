import React from "react";
import { ViewCode } from "../_components/view-code";
import { db } from "@/lib/db/db";

async function RecentPageId({ params }) {
  const id = params.id;

  const snippet = await db.code.findUnique({
    where: {
      id,
    },
  });


  return (
    <div>
      <div>
        <ViewCode code={snippet?.code} />
      </div>
    </div>
  );
}

export default RecentPageId;
