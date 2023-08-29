import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (res: Response, userId: string) => {
  const token: string = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  res.setHeader("Set-Cookie", `jwt=${token}; HttpOnly; Max-Age=${1 * 24 * 60 * 60 * 100}; SameSite=Strict; Path=/;`);
  return token;
};
