"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = void 0;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const borrowBook = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if book exists and has available copies
    const book = yield prisma.book.findUnique({ where: { bookId } });
    if (!book || book.availableCopies < 1) {
        throw new Error("Book not available");
    }
    // Check if member exists
    const member = yield prisma.member.findUnique({ where: { memberId } });
    if (!member) {
        throw new Error("Member not found");
    }
    // Create borrow record
    const borrowRecord = yield prisma.borrowRecord.create({
        data: {
            bookId,
            memberId,
            borrowDate: new Date(),
        },
    });
    // Decrement availableCopies
    yield prisma.book.update({
        where: { bookId },
        data: { availableCopies: { decrement: 1 } },
    });
    return borrowRecord;
});
exports.borrowBook = borrowBook;
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find borrow record
    const borrowRecord = yield prisma.borrowRecord.findUnique({ where: { borrowId } });
    if (!borrowRecord) {
        throw new Error("Borrow record not found");
    }
    if (borrowRecord.returnDate) {
        throw new Error("Book already returned");
    }
    // Update borrow record with returnDate
    yield prisma.borrowRecord.update({
        where: { borrowId },
        data: { returnDate: new Date() },
    });
    // Increment availableCopies
    yield prisma.book.update({
        where: { bookId: borrowRecord.bookId },
        data: { availableCopies: { increment: 1 } },
    });
    return true;
});
exports.returnBook = returnBook;
