import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const borrowBook = async (bookId: string, memberId: string) => {
  // Check if book exists and has available copies
  const book = await prisma.book.findUnique({ where: { bookId } });
  if (!book || book.availableCopies < 1) {
    throw new Error("Book not available");
  }
  // Check if member exists
  const member = await prisma.member.findUnique({ where: { memberId } });
  if (!member) {
    throw new Error("Member not found");
  }
  // Create borrow record
  const borrowRecord = await prisma.borrowRecord.create({
    data: {
      bookId,
      memberId,
      borrowDate: new Date(),
    },
  });
  // Decrement availableCopies
  await prisma.book.update({
    where: { bookId },
    data: { availableCopies: { decrement: 1 } },
  });
  return borrowRecord;
};

export const returnBook = async (borrowId: string) => {
  // Find borrow record
  const borrowRecord = await prisma.borrowRecord.findUnique({ where: { borrowId } });
  if (!borrowRecord) {
    throw new Error("Borrow record not found");
  }
  if (borrowRecord.returnDate) {
    throw new Error("Book already returned");
  }
  // Update borrow record with returnDate
  await prisma.borrowRecord.update({
    where: { borrowId },
    data: { returnDate: new Date() },
  });
  // Increment availableCopies
  await prisma.book.update({
    where: { bookId: borrowRecord.bookId },
    data: { availableCopies: { increment: 1 } },
  });
  return true;
}; 