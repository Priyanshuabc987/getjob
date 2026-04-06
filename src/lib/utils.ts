import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function normalizeStringForQuery(input: string): string {
    if (!input) return '';

    return input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-&()]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Extracts the Firebase document ID from the end of a URL slug.
 * E.g., "my-startup-name-XV4fG2Asr4d2h2dJd21k" -> "XV4fG2Asr4d2h2dJd21k"
 */
export function getIdFromSlug(slug: string): string {
    if (!slug) return '';
    const parts = slug.split('-');
    return parts[parts.length - 1];
}

/**
 * Returns a formatted duration string for a project build time.
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

export function calculateDuration(startDate: Date, endDate: Date): string {
    let diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    diffInMonths -= startDate.getMonth();
    diffInMonths += endDate.getMonth();
    const duration = diffInMonths <= 0 ? 0 : diffInMonths;

    const years = Math.floor(duration / 12);
    const months = duration % 12;

    let durationString = '';
    if (years > 0) {
        durationString += `${years}y`;
    }
    if (months > 0) {
        if (years > 0) durationString += ' ';
        durationString += `${months}m`;
    }
    if (durationString === '') {
        return '1m';
    }
    return durationString;
}

export function formatProfessionalDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}