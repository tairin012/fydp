export interface StudentCourseCardProps {
  imgPath: string;
  heading: string;
  /** Shown as "Code: <courseCode>" unless `badge` is given. */
  courseCode?: string;
  /** Replaces the "Code: ..." label (e.g. "5 chapters", "Draft"). */
  badge?: string;
  /** Where the card's button goes. */
  href?: string;
  /** Button text (default "Start"). */
  actionLabel?: string;
}

export interface TeacherCourseCardProps {
  imgPath: string;
  heading: string;
  courseCode?: string;
  badge?: string;
  href?: string;
  actionLabel?: string;
}
