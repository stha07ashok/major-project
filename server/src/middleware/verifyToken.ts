import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  userId?: string; // Add userId to the request for future use
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract the token from cookies or Authorization header
    let token = req.cookies.token;
    
    // If no token in cookies, check Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized - no token provided" });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as jwt.JwtPayload;

    // Attach the userId to the request object for future use
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in verifyToken: ", error);
    if (error instanceof jwt.JsonWebTokenError) {
      // Invalid token
      res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
      return;
    }

    // Other server errors
    res.status(500).json({ success: false, message: "Server error" });
  }
};
