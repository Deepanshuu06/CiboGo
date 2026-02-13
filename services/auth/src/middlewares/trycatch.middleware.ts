import { Request, Response, RequestHandler, NextFunction } from "express";

const TryCatch = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error("Error in TryCatch middleware:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
};
export default TryCatch;
