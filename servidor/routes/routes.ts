import { authRoutes } from "servidor/routes/authRoutes";
import { templateRoutes } from "servidor/routes/templateRoutes";
import { uploadRouter } from "servidor/routes/uploadFiles";
import { createUploadthingExpressHandler } from "uploadthing/express";
import { Express } from "express";
// import { authRequired } from "servidor/middleware/validateToken";
import { calendarRoutes } from "servidor/routes/calendarRoutes";

export function useRouter(app:Express) {
  app.use("/auth", authRoutes);

  //templates with auth
  app.use("/templates",templateRoutes);

  app.use("/calendar",calendarRoutes)

  app.use(
    //Upload files
    "/api/uploadthing",
    createUploadthingExpressHandler({
      router: uploadRouter,
    })
  );
}
