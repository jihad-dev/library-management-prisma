
import { PrismaClient } from "../../generated/prisma";
import { BookInput } from "./book.interface";
const prisma = new PrismaClient();

const createBook = async (book: BookInput) => {
  const result = await prisma.book.create({
    data: book
  });
  return result;
};
const getAllBooks = async () => {
  const result = await prisma.book.findMany()
  return result;
};
const getSingleBook = async (bookId: string) => {
  return await prisma.book.findUnique({
    where: {
      bookId
    },
  });
};

const updateBooks = async (bookId: string, payload: Partial<BookInput>) => {
  const updatedBook = await prisma.book.update({
    where: { bookId },
    data: payload,
  });

  return updatedBook;
};

const deleteBook = async (bookId: string) => {
  // 1️⃣ check if the book exists
  const isExists = await prisma.book.findUnique({
    where: { bookId },
  });

  if (!isExists) {
    return null;
  }

  // 2️⃣ delete the book
  return await prisma.book.delete({
    where: { bookId },
  });
};


export const bookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBooks,
  deleteBook
};
