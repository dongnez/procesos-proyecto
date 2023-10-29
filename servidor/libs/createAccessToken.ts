import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


export async function createAccesstoken(payload:{id:string}) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secretJWT",
      {
        expiresIn: "5d",
      },
      (error, token) => {
        if (error) reject(error);

        resolve(token);
      }
    );
  });
}
