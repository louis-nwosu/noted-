import { Request, Response } from "express";
import { researchNote, generateQuiz, gradeQuiz } from "../services/ai.service";

export async function research(req: Request, res: Response) {
  try {
    const { content } = req.body;
    if (!content || typeof content !== "string") {
      res.status(400).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: "content is required" },
      });
      return;
    }

    const result = await researchNote(content);
    res.json({ success: true, data: result });
  } catch (err: any) {
    console.error("AI research error:", err);
    res.status(500).json({
      success: false,
      error: { code: "AI_ERROR", message: err.message || "Research failed" },
    });
  }
}

export async function quizGenerate(req: Request, res: Response) {
  try {
    const { content, difficulty, count } = req.body;
    if (!content || typeof content !== "string") {
      res.status(400).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: "content is required" },
      });
      return;
    }

    const validDifficulties = ["easy", "medium", "hard"];
    const diff = validDifficulties.includes(difficulty) ? difficulty : "medium";

    const result = await generateQuiz(content, diff, count || 5);
    res.json({ success: true, data: result });
  } catch (err: any) {
    console.error("AI quiz generation error:", err);
    res.status(500).json({
      success: false,
      error: { code: "AI_ERROR", message: err.message || "Quiz generation failed" },
    });
  }
}

export async function quizGrade(req: Request, res: Response) {
  try {
    const { questions, answers } = req.body;
    if (!questions || !answers) {
      res.status(400).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: "questions and answers are required" },
      });
      return;
    }

    const result = await gradeQuiz(questions, answers);
    res.json({ success: true, data: result });
  } catch (err: any) {
    console.error("AI quiz grading error:", err);
    res.status(500).json({
      success: false,
      error: { code: "AI_ERROR", message: err.message || "Grading failed" },
    });
  }
}
