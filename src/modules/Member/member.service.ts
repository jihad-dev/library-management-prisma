import { PrismaClient } from "../../generated/prisma";
import { MemberInput } from "./member.interface";
const prisma = new PrismaClient();

const createMember = async (member: MemberInput) => {
  const result = await prisma.member.create({
    data: member,
  });
  return result;
};

const getAllMembers = async () => {
  return await prisma.member.findMany();
};

const getSingleMember = async (memberId: string) => {
  return await prisma.member.findUnique({
    where: { memberId },
  });
};

const updateMember = async (memberId: string, payload: Partial<MemberInput>) => {
  const updatedMember = await prisma.member.update({
    where: { memberId },
    data: payload,
  });
  return updatedMember;
};

const deleteMember = async (memberId: string) => {
  const isExists = await prisma.member.findUnique({
    where: { memberId },
  });
  if (!isExists) {
    return null;
  }
  return await prisma.member.delete({
    where: { memberId },
  });
};

export const memberServices = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
}; 