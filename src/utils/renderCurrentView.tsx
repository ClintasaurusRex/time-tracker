import { useState } from "react";

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
  viewMode: ViewMode;
  entries: TimeEntry[];
  selectedDate: Date;
  handleEditEntry: (entry: TimeEntry) => void;
  handleDeleteEntry: (id: string) => void;
  handleAddEntry: () => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedDate: (date: Date) => void;
}

export default const renderCurrentView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");

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
      return null;
  }
};
