import jwt from "jsonwebtoken";

export default function createTokenByUserId(userId: string) {
  return jwt.sign({ data: { _id: null } }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
}
