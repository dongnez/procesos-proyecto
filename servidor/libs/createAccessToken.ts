import jwt from "jsonwebtoken";


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
