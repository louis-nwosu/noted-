'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { X, Sparkles, Loader2, AlertCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizResult {
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

interface Props {
  noteContent: string;
  onClose: () => void;
}

type Phase = 'generate' | 'taking' | 'grading' | 'results';

export function QuizModal({ noteContent, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('generate');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [grading, setGrading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleGenerate = async () => {
    if (!noteContent || noteContent === '{}') return;
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/ai/quiz/generate', { content: noteContent, difficulty, count });
      if (data.success) {
        setQuestions(data.data);
        setAnswers(new Array(data.data.length).fill(-1));
        setPhase('taking');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Quiz generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
  };

  const handleSubmit = async () => {
    const unanswered = answers.some((a) => a === -1);
    if (unanswered) return;
    setGrading(true);
    setError('');
    try {
      const payload = {
        questions,
        answers: questions.map((_, i) => ({ questionIndex: i, selectedIndex: answers[i] })),
      };
      const { data } = await api.post('/ai/quiz/grade', payload);
      if (data.success) {
        setResult(data.data);
        setPhase('results');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Grading failed');
    } finally {
      setGrading(false);
    }
  };

  const handleRetry = () => {
    setPhase('generate');
    setQuestions([]);
    setAnswers([]);
    setResult(null);
    setError('');
  };

  const allAnswered = answers.every((a) => a !== -1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg max-h-[80vh] rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--nt-border)] shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--nt-accent)]" />
            <span className="font-mono text-sm font-medium text-[var(--nt-text-primary)]">
              {phase === 'generate' && 'Generate Quiz'}
              {phase === 'taking' && 'Quiz'}
              {phase === 'results' && 'Quiz Results'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {error && (
            <div className="flex items-start gap-2 rounded border border-red-500/30 bg-red-500/10 px-3 py-2 mb-4">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span className="font-mono text-xs text-red-400">{error}</span>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="h-8 w-8 text-[var(--nt-accent)] animate-spin" />
              <span className="font-mono text-xs text-[var(--nt-text-muted)]">Generating quiz questions…</span>
            </div>
          )}

          {grading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="h-8 w-8 text-[var(--nt-accent)] animate-spin" />
              <span className="font-mono text-xs text-[var(--nt-text-muted)]">Grading your answers…</span>
            </div>
          )}

          {phase === 'generate' && !loading && (
            <div className="space-y-5">
              <div>
                <label className="font-mono text-xs text-[var(--nt-text-muted)] block mb-2">Difficulty</label>
                <div className="flex gap-2">
                  {(['easy', 'medium', 'hard'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 rounded px-3 py-2 font-mono text-xs font-medium transition-all cursor-pointer ${
                        difficulty === d
                          ? 'bg-[var(--nt-accent)] text-[var(--nt-bg)]'
                          : 'border border-[var(--nt-border)] text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
                      }`}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-[var(--nt-text-muted)] block mb-2">Number of questions (3-10)</label>
                <input
                  type="range"
                  min={3}
                  max={10}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full accent-[var(--nt-accent)]"
                />
                <div className="text-center font-mono text-xs text-[var(--nt-text-primary)] mt-1">{count}</div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!noteContent || noteContent === '{}'}
                className="flex w-full items-center justify-center gap-2 rounded bg-[var(--nt-accent)] px-4 py-2.5 font-mono text-sm font-medium text-[var(--nt-bg)] hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                Generate Quiz
              </button>
            </div>
          )}

          {phase === 'taking' && !loading && questions.length > 0 && (
            <div className="space-y-6">
              {questions.map((q, qi) => (
                <div key={qi}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="font-mono text-xs font-medium text-[var(--nt-accent)] shrink-0 mt-0.5">
                      Q{qi + 1}.
                    </span>
                    <span className="font-mono text-xs text-[var(--nt-text-primary)]">{q.question}</span>
                  </div>
                  <div className="space-y-1.5 ml-5">
                    {q.options.map((opt, oi) => {
                      const selected = answers[qi] === oi;
                      return (
                        <button
                          key={oi}
                          onClick={() => handleSelect(qi, oi)}
                          className={`w-full text-left rounded px-3 py-2 font-mono text-[11px] transition-all cursor-pointer ${
                            selected
                              ? 'bg-[var(--nt-accent)]/20 border border-[var(--nt-accent)] text-[var(--nt-accent)]'
                              : 'border border-[var(--nt-border)] text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
                          }`}
                        >
                          {String.fromCharCode(65 + oi)}. {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {!allAnswered && (
                <div className="font-mono text-[10px] text-[var(--nt-accent-warm)] text-center">
                  Answer all questions to submit
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!allAnswered || grading}
                className="flex w-full items-center justify-center gap-2 rounded bg-[var(--nt-accent)] px-4 py-2.5 font-mono text-sm font-medium text-[var(--nt-bg)] hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
              >
                {grading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Grading…
                  </>
                ) : (
                  'Submit Answers'
                )}
              </button>
            </div>
          )}

          {phase === 'results' && result && (
            <div className="space-y-5">
              <div className="text-center py-6">
                <div className="font-display text-5xl font-bold mb-2" style={{ color: result.percentage >= 70 ? 'var(--nt-accent)' : result.percentage >= 40 ? 'var(--nt-accent-warm)' : '#ef4444' }}>
                  {result.percentage}%
                </div>
                <div className="font-mono text-xs text-[var(--nt-text-muted)]">
                  {result.score} of {result.total} correct
                </div>
                <div className="font-mono text-[10px] text-[var(--nt-text-muted)] mt-1">
                  {result.percentage >= 80 ? 'Excellent!' : result.percentage >= 60 ? 'Good job!' : result.percentage >= 40 ? 'Keep practicing' : 'Review the material'}
                </div>
              </div>

              <div className="space-y-3">
                {result.results.map((r) => (
                  <div
                    key={r.questionIndex}
                    className={`rounded border px-3 py-2.5 ${
                      r.correct
                        ? 'border-[var(--nt-accent)]/30 bg-[var(--nt-accent)]/5'
                        : 'border-red-500/30 bg-red-500/5'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      {r.correct ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--nt-accent)] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-mono text-xs text-[var(--nt-text-primary)]">{r.question}</div>
                        <div className="font-mono text-[10px] text-[var(--nt-text-muted)] mt-1">
                          {!r.correct && (
                            <>Your answer: {String.fromCharCode(65 + r.selectedIndex)}. {questions[r.questionIndex]?.options[r.selectedIndex]}</>
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-[var(--nt-accent)] mt-0.5">
                          Correct answer: {String.fromCharCode(65 + r.correctIndex)}. {questions[r.questionIndex]?.options[r.correctIndex]}
                        </div>
                      </div>
                    </div>
                    {r.explanation && (
                      <div className="font-mono text-[10px] text-[var(--nt-text-muted)] mt-1.5 pl-5.5">
                        {r.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRetry}
                  className="flex flex-1 items-center justify-center gap-2 rounded border border-[var(--nt-border)] px-4 py-2 font-mono text-xs text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  New Quiz
                </button>
                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-[var(--nt-accent)] px-4 py-2 font-mono text-xs font-medium text-[var(--nt-bg)] hover:opacity-90 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
