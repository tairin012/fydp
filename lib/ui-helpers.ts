export const FALLBACK_COURSE_IMAGE = '/images/course-one.png'

/** getProgress() returns NaN for a course with no published chapters (0/0). */
export const safePercent = (value: number | null | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : 0

export const chaptersLabel = (count: number) => `${count} chapter${count === 1 ? '' : 's'}`
