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
exports.memberServices = void 0;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const createMember = (member) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.member.create({
        data: member,
    });
    return result;
});
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.findMany();
});
const getSingleMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.findUnique({
        where: { memberId },
    });
});
const updateMember = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedMember = yield prisma.member.update({
        where: { memberId },
        data: payload,
    });
    return updatedMember;
});
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma.member.findUnique({
        where: { memberId },
    });
    if (!isExists) {
        return null;
    }
    return yield prisma.member.delete({
        where: { memberId },
    });
});
exports.memberServices = {
    createMember,
    getAllMembers,
    getSingleMember,
    updateMember,
    deleteMember,
};
