import { Request, Response } from "express";
import * as borrowService from "./borrow.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

export const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;
  const borrowRecord = await borrowService.borrowBook(bookId, memberId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book borrowed successfully",
    data: {
      borrowId: borrowRecord.borrowId,
      bookId: borrowRecord.bookId,
      memberId: borrowRecord.memberId,
      borrowDate: borrowRecord.borrowDate,
    },
  });
});

export const returnBook = catchAsync(async (req: Request, res: Response) => {
  const { borrowId } = req.body;
  await borrowService.returnBook(borrowId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book returned successfully",
  });
}); 