export interface TimeEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format (24-hour)
  endTime: string; // HH:MM format (24-hour)
  hours: number;
  task: string;
}

export type ViewMode =
  | "dashboard"
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "yearly"
  | "custom";

export interface DateRange {
  start: string;
  end: string;
}
