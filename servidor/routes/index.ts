import { authRoutes } from "servidor/routes/authRoutes";
import { templateRoutes } from "servidor/routes/templateRoutes";
import { uploadRouter } from "servidor/routes/uploadFiles";
import { createUploadthingExpressHandler } from "uploadthing/express";
import { Express } from "express";
import { authRequired } from "servidor/middleware/validateToken";

export function useRouter(app:Express) {
  app.use("/auth", authRoutes);

  //templates with auth
  app.use("/templates", templateRoutes );

  app.use(
    //Upload files
    "/api/uploadthing",
    createUploadthingExpressHandler({
      router: uploadRouter,
    })
  );
}
