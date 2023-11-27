import * as jwtL from "jsonwebtoken";
import { JWT_SECRET } from "servidor/config";

export const authRequired = (req, res, next) => {
	
  try {
    const { token } = req.headers.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwtL.verify(token, JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }


	  console.log("Token verificado", user,token)

      req.user = user;
      next();
    });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
