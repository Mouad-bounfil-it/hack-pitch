import jwt from "jsonwebtoken";
import getServerAuthSession from "@/lib/get-server-auth-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  const isUserAuthenticated = !!session && !!session?.user?.id;

  if (!isUserAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "You must be logged in.",
    });
  }

  const token = jwt.sign(
    { data: { _id: session.user.id } },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  if (!token) {
    return res.status(498).json({
      success: false,
      message: "Error in generate token",
    });
  }

  return res.status(200).json({ token, success: true });
}
