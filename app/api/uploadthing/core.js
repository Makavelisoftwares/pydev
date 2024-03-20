import { createUploadthing } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

export const ourFileRouter = {
  image_url: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { userId } = auth();

      if (!userId) {
        throw new Error("unAuthorized");
      }

      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),

  carImages: f({ image: { maxFileSize: "16MB", maxFileCount: 10 } })
    .middleware(async () => {
      const { userId } = auth();

      if (!userId) {
        throw new Error("unAuthorized");
      }

      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),
};
