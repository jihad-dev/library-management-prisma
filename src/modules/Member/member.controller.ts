import { Request, Response } from "express";
import { memberServices } from "./member.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const member = req.body;
  const result = await memberServices.createMember(member);
  res.status(201).json({
    success: true,
    status: 201,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.getAllMembers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getSingleMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const result = await memberServices.getSingleMember(memberId);
  if (!result) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Member not found",
      
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const result = await memberServices.updateMember(memberId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const result = await memberServices.deleteMember(memberId);
  if (!result) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Member not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member successfully deleted",
    data:result
  });
});

export const memberController = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
}; 