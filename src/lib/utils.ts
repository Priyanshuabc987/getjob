import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a duration from a start date to now in a concise format.
 * E.g., "15d", "3m+", "1y+"
 */
export function formatBuildingDuration(createdAt: string): string {
  if (!createdAt) return "New";
  const start = new Date(createdAt);
  const now = new Date();
  const diffInMs = now.getTime() - start.getTime();
  
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "1d";
  if (days < 30) return `${days}d`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m+`;
  
  const years = Math.floor(months / 12);
  return `${years}y+`;
}
