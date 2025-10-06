// Views
import DashboardOverview from "../views/DashboardOverview";
import DailyView from "../views/DailyView";
import WeeklyView from "../views/WeeklyView";
import MonthlyView from "../views/MonthlyView";
import YearlyView from "../views/YearlyView";
import CustomRangeView from "../views/CustomRangeView";
import BiWeeklyView from "../views/BiWeeklyView";

import type { TimeEntry, ViewMode } from "../types";
interface RenderCurrentViewProps {
  viewMode: ViewMode; // Current view mode (e.g., "daily", "weekly")
  entries: TimeEntry[]; // List of time entries
  selectedDate: Date; // Currently selected date
  handleEditEntry: (entry: TimeEntry) => void; // Function to handle editing an entry
  handleDeleteEntry: (id: string) => void; // Function to handle deleting an entry
  handleAddEntry: () => void; // Function to handle adding a new entry
  setViewMode: (mode: ViewMode) => void; // Function to change the view mode
  setSelectedDate: (date: Date) => void; // Function to change the selected date
}

// React component to render the current view based on the viewMode
export default function RenderCurrentView({
  viewMode,
  entries,
  selectedDate,
  handleEditEntry,
  handleDeleteEntry,
  handleAddEntry,
  setViewMode,
  setSelectedDate,
}: RenderCurrentViewProps) {
  // Switch statement to render the appropriate view based on the viewMode
  switch (viewMode) {
    case "dashboard":
      return (
        <DashboardOverview
          entries={entries}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
          onAddEntry={handleAddEntry}
        />
      );
    case "daily":
      return (
        <DailyView
          entries={entries}
          selectedDate={selectedDate}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
          onAddEntry={handleAddEntry}
        />
      );
    case "weekly":
      return (
        <WeeklyView
          entries={entries}
          selectedDate={selectedDate}
          onAddEntry={handleAddEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      );
    case "biweekly":
      return (
        <BiWeeklyView
          entries={entries}
          selectedDate={selectedDate}
          onAddEntry={handleAddEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      );
    case "monthly":
      return (
        <MonthlyView
          entries={entries}
          selectedDate={selectedDate}
          onAddEntry={handleAddEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      );
    case "yearly":
      return (
        <YearlyView
          entries={entries}
          selectedDate={selectedDate}
          onAddEntry={handleAddEntry}
          onNavigate={(mode, date) => {
            setViewMode(mode);
            setSelectedDate(date);
          }}
        />
      );
    case "custom":
      return (
        <CustomRangeView
          entries={entries}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
          onAddEntry={handleAddEntry}
        />
      );
    default:
      return null; // Return null if no valid viewMode is provided
  }
}
