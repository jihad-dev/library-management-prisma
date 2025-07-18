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
exports.bookServices = void 0;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({
        data: book
    });
    return result;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findMany();
    return result;
});
const getSingleBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.book.findUnique({
        where: {
            bookId
        },
    });
});
const updateBooks = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield prisma.book.update({
        where: { bookId },
        data: payload,
    });
    return updatedBook;
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // 1️⃣ check if the book exists
    const isExists = yield prisma.book.findUnique({
        where: { bookId },
    });
    if (!isExists) {
        return null;
    }
    // 2️⃣ delete the book
    return yield prisma.book.delete({
        where: { bookId },
    });
});
exports.bookServices = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBooks,
    deleteBook
};
