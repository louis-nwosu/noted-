export interface AiConcept {
  term: string;
  explanation: string;
}

export interface AiRelatedTopic {
  topic: string;
  description: string;
}

export interface AiReference {
  title: string;
  url: string;
  description: string;
}

export interface AiResearchResult {
  summary: string;
  concepts: AiConcept[];
  relatedTopics: AiRelatedTopic[];
  references: AiReference[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizAnswer {
  questionIndex: number;
  selectedIndex: number;
}

export interface QuizGradeResult {
  score: number;
  total: number;
  percentage: number;
  results: {
    questionIndex: number;
    question: string;
    correct: boolean;
    correctIndex: number;
    selectedIndex: number;
    explanation: string;
  }[];
}

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || "openrouter/owl-alpha";

function stripMarkdown(text: string): string {
  return text.replace(/```(?:json)?\s*/gi, "").replace(/```$/gm, "").trim();
}

export async function generate(systemPrompt: string, userContent: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables");
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": process.env.CLIENT_URL || "https://note-take-x.vercel.app",
      "X-Title": "Folio",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 4096,
    }),
  });

  const body: any = await res.json();

  if (!res.ok) {
    const msg = body?.error?.message || `HTTP ${res.status}`;
    if (res.status === 429) {
      throw new Error(
        `OpenRouter rate limit hit. Please try again shortly. (${msg})`
      );
    }
    throw new Error(`OpenRouter error: ${msg}`);
  }

  const text = body?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from OpenRouter");
  return text;
}

export async function researchNote(content: string): Promise<AiResearchResult> {
  const systemPrompt = `You are a research assistant. Analyze the given note and return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "summary": "2-3 sentence summary of the note's key topics",
  "concepts": [
    { "term": "key term", "explanation": "brief explanation" }
  ],
  "relatedTopics": [
    { "topic": "related topic name", "description": "how it connects" }
  ],
  "references": [
    { "title": "resource title", "url": "https://...", "description": "what this resource covers" }
  ]
}

Include 3-5 concepts, 2-4 related topics, and 2-4 references. If the note is empty or trivial, return empty arrays.`;

  const text = await generate(systemPrompt, content);
  return JSON.parse(stripMarkdown(text));
}

export async function generateQuiz(
  content: string,
  difficulty: "easy" | "medium" | "hard",
  count: number
): Promise<QuizQuestion[]> {
  const clampedCount = Math.max(3, Math.min(10, count || 5));

  const systemPrompt = `You are a quiz generator. Generate ${clampedCount} ${difficulty} difficulty quiz questions based on the given content.
Return ONLY valid JSON (no markdown, no code fences) as an array of objects:
[
  {
    "question": "the question text",
    "options": ["option A", "option B", "option C", "option D"],
    "correctIndex": 0,
    "explanation": "why this answer is correct"
  }
]

Each question must have exactly 4 options. correctIndex must be 0-3. Make questions meaningful and based on the provided content.`;

  const text = await generate(systemPrompt, content);
  const parsed = JSON.parse(stripMarkdown(text));
  return Array.isArray(parsed) ? parsed : parsed.questions || [];
}

export async function gradeQuiz(
  questions: QuizQuestion[],
  answers: QuizAnswer[]
): Promise<QuizGradeResult> {
  const systemPrompt = `You are a quiz grader. Grade the following answers and return ONLY valid JSON (no markdown, no code fences) with this structure:
{
  "results": [
    {
      "questionIndex": 0,
      "correct": true/false,
      "explanation": "feedback on this answer"
    }
  ]
}

Compute and include score, total, and percentage in the top-level object.`;

  const userContent = `QUESTIONS:\n${JSON.stringify(questions, null, 2)}\n\nANSWERS:\n${JSON.stringify(answers, null, 2)}`;

  const text = await generate(systemPrompt, userContent);
  const parsed: { results: { questionIndex: number; correct: boolean; explanation: string }[]; score?: number; total?: number } =
    JSON.parse(stripMarkdown(text));

  const total = questions.length;
  const correctCount = parsed.results?.filter((r) => r.correct).length || 0;

  return {
    score: correctCount,
    total,
    percentage: Math.round((correctCount / total) * 100),
    results: parsed.results.map((r) => {
      const q = questions[r.questionIndex];
      const a = answers.find((a) => a.questionIndex === r.questionIndex);
      return {
        questionIndex: r.questionIndex,
        question: q?.question || "",
        correct: r.correct,
        correctIndex: q?.correctIndex ?? -1,
        selectedIndex: a?.selectedIndex ?? -1,
        explanation: r.explanation,
      };
    }),
  };
}
