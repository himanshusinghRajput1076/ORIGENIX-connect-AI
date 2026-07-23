import { Router } from "express";
import { AIController } from "./controller";

const router: Router = Router();

router.post("/analyze", AIController.analyze);
router.post("/matching", AIController.match);
router.post("/outreach", AIController.outreach);
router.get("/trends", AIController.trends);

export default router;
