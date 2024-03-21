import Link from "next/link";
import React from "react";

function ResourcesPage() {
  const links = [
    {
      id: 1,
      link: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
    },
    {
      id: 2,
      link: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
    },
    {
      id: 3,
      link: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    },
    {
      id: 4,
      link: "https://www.youtube.com/watch?v=b093aqAZiPU",
    },
  ];

  return (
    <div>
      <div>
        <div className="font-bold text-lg my-3">Links to python tutorials</div>
        <div className="flex flex-col space-y-2">
          {links.map((item, i) => (
            <Link
              target="_blank"
              className="text-sm flex items-center space-x-2 p-3 hover:text-sky-400 hover:underline"
              key={i}
              href={item?.link}
            >
              <span>{i + 1}</span>
              <span>{item?.link}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;
