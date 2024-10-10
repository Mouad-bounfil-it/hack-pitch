import jwt from "jsonwebtoken";
import axios, { AxiosResponse, Method } from "axios";
import getServerAuthSession from "@/lib/get-server-auth-session";

import type { NextApiRequest, NextApiResponse } from "next";

export const BACKEND_BASE_EP = process.env.NEXT_PUBLIC_BASE_ENDPOINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let forwardedHeaders = {};
  let forwardedBody = req.body;
  let token = null;

  const originalUrl = req.url.replace("/api/gateway", "");

  if (isPrivateRoute(originalUrl)) {
    const session = await getServerAuthSession({ req, res });
    const isUserAuthenticated = !!session && !!session?.user?.id;

    if (!isUserAuthenticated) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in.",
      });
    }

    token = generateTokenByUser(session.user.id);

    if (!token) {
      return res.status(498).json({
        success: false,
        message: "Error in generate token",
      });
    }

    forwardedHeaders["Authorization"] = `Bearer ${token}`;
  } else {
    // Generate a token for public routes
    token = generateTokenByUser(null);

    if (!token) {
      return res.status(498).json({
        success: false,
        message: "Error in generate token for public route",
      });
    }

    forwardedHeaders["Authorization"] = `Bearer ${token}`;
  }

  // HACK
  const reqUrl = `${BACKEND_BASE_EP}${originalUrl}`;

  try {
    const response: AxiosResponse = await axios({
      method: req.method as Method,
      url: reqUrl, //`${BACKEND_BASE_EP}${originalUrl}`,
      headers: forwardedHeaders,
      data: forwardedBody,
      // port: process.env.VERCEL ? 443 : 80,
    });

    return handleResponse(res, response);
    // return res.status(response.status).json(response.data);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
    }

    const status = error?.response?.data?.status || 500;

    return res.status(status).json(error?.response?.data);
  }
}

function isPrivateRoute(url: string): boolean {
  if (typeof url !== "string" || url === "") return false;

  const publicRoutes = ["/api/public"];

  return !publicRoutes.some((prefix) => url.startsWith(prefix));
}

function generateTokenByUser(userId: string) {
  return jwt.sign({ data: { _id: userId } }, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });
}
function getResponseType(headers) {
  if (headers["content-type"]?.includes("text/html")) {
    return "html";
  } else if (headers["content-type"]?.includes("text/plain")) {
    return "text";
  } else if (headers["content-type"]?.includes("application/json")) {
    // Explicitly check for JSON to avoid conflicts with other text types
    return "json";
  } else {
    return "unsupported";
  }
}

function handleResponse(res, response: AxiosResponse) {
  const respType = getResponseType(response.headers);

  if (respType === "json") {
    return res.status(response.status).json(response.data);
  } else if (respType === "html") {
    res.setHeader("Content-Type", "text/html");
    return res.send(response.data);
  } else if (respType === "text") {
    res.setHeader("Content-Type", "text/plain");
    return res.send(response.data);
  } else {
    return res.status(response.status).json(response.data);
    // Handle unsupported types (optional)
    // return res
    //   .status(500)
    //   .json({ message: "Unsupported response type", respType });
  }
}
