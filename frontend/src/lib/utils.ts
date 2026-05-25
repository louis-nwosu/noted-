import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return 'This Week';
  if (days < 30) return 'Earlier this month';

  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function getDateGroup(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return 'This Week';
  if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
    return 'Earlier this month';
  }
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function computeReadingTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}
