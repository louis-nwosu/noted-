import { PDFParse } from 'pdf-parse';
import { generate } from './ai.service';

export interface PdfSummaryResult {
  rawText: string;
  summary: string;
  isScanned: boolean;
}

const MAX_CHARS = 100000;

export async function extractPdfText(buffer: Buffer): Promise<string> {
  const doc = new PDFParse({ data: buffer });
  const result = await doc.getText();
  await doc.destroy();
  return result.text || '';
}

export async function summarizePdfText(text: string): Promise<string> {
  if (!text || text.trim().length < 20) {
    return '';
  }

  const truncated = text.slice(0, MAX_CHARS);
  const systemPrompt = `You are a document summarizer. Given the extracted text from a PDF document, produce a detailed structured summary. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "overview": "2-3 sentence overview of the document",
  "keyPoints": ["key point 1", "key point 2", "..."],
  "details": "2-4 sentences covering important details",
  "conclusions": "1-2 sentences summarizing conclusions or main takeaways"
}`;

  try {
    const raw = await generate(systemPrompt, truncated);

    const cleaned = raw
      .replace(/```(?:json)?\s*/gi, '')
      .replace(/```$/gm, '')
      .trim();

    const parsed = JSON.parse(cleaned);

    const parts: string[] = [];
    if (parsed.overview) parts.push(`### Overview\n\n${parsed.overview}`);
    if (parsed.keyPoints?.length) {
      parts.push(`### Key Points\n\n${parsed.keyPoints.map((k: string) => `- ${k}`).join('\n')}`);
    }
    if (parsed.details) parts.push(`### Details\n\n${parsed.details}`);
    if (parsed.conclusions) parts.push(`### Conclusions\n\n${parsed.conclusions}`);

    return parts.join('\n\n');
  } catch {
    return '';
  }
}
