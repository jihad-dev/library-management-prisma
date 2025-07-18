import { Request, Response } from "express";
import { bookServices } from "./book.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await bookServices.createBook(book);
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: result,
  })
})
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.getAllBooks();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Book Retrived successfully",
    data: result,
  })
})

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await bookServices.getSingleBook(bookId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "❌ Book not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "✅ Book retrieved successfully",
    data: result,
  })
})
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await bookServices.updateBooks(bookId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "✅ Book update successfully",
    data: result,
  })

})
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await bookServices.deleteBook(bookId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "❌ Book not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "✅ Book deleted successfully",
    data: result,
  })

})

export const bookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
}