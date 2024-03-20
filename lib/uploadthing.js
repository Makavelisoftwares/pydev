import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const {
  UploadButton,
  UploadDropzone,
  Uploader,
} = generateComponents();
export const { useUploadThing, uploadFiles } = generateReactHelpers();