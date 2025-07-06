export interface TimeEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  hours: number;
  task: string;
}

export type ViewMode = 'dashboard' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'custom';

export interface DateRange {
  start: string;
  end: string;
}
