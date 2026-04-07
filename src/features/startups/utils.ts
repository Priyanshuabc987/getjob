
// src/features/startups/utils.ts

/**
 * Formats the team size range into a display string.
 * Examples: '1', '2-5', '10+'
 */
export const formatTeamSize = (min: number, max: number): string => {
    if (min === 1 && max === 1) return '1';
    if (max >= 999999) return `${min}+`;
    if (min === max) return `${min}`;
    return `${min}-${max}`;
  };
