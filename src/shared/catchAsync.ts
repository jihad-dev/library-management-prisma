
import { NextFunction, Request, Response } from 'express';

const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Automatically forward error to global error handler
  };
};

export default catchAsync;
