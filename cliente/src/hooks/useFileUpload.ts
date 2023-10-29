import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "../../../servidor/routes/uploadFiles";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();