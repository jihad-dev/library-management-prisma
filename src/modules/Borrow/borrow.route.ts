import { Router } from "express";
import * as borrowController from "./borrow.controller";

const router = Router();

router.post("/borrow", borrowController.borrowBook);
router.post("/return", borrowController.returnBook);

export const borrowRoutes = router; 