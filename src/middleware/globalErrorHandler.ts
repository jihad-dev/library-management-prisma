
import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong!',
  });
};

export default globalErrorHandler;
