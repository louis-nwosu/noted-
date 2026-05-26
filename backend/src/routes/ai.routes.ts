import { Router } from "express";
import { authGuard } from "../middleware/authGuard";
import { research, quizGenerate, quizGrade } from "../controllers/ai.controller";

const router = Router();

router.use(authGuard);

router.post("/research", research);
router.post("/quiz/generate", quizGenerate);
router.post("/quiz/grade", quizGrade);

export default router;
