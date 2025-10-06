// Import necessary dependencies and types
import React from "react";
import type { TimeEntry, ViewMode } from "../types";

// Import all the view components that can be rendered based on the viewMode
import DashboardOverview from "../views/DashboardOverview";
import DailyView from "../views/DailyView";
import WeeklyView from "../views/WeeklyView";
import MonthlyView from "../views/MonthlyView";
import YearlyView from "../views/YearlyView";
import CustomRangeView from "../views/CustomRangeView";
import BiWeeklyView from "../views/BiWeeklyView";

// Define the props for the RenderCurrentView component
interface RenderCurrentViewProps {
  viewMode: ViewMode; // The current view mode (e.g., daily, weekly, etc.)
  entries: TimeEntry[]; // List of time entries to display
  selectedDate: Date; // The currently selected date
  handleEditEntry: (entry: TimeEntry) => void; // Function to handle editing an entry
  handleDeleteEntry: (id: string) => void; // Function to handle deleting an entry
  handleAddEntry: () => void; // Function to handle adding a new entry
  setViewMode: (mode: ViewMode) => void; // Function to update the view mode
  setSelectedDate: (date: Date) => void; // Function to update the selected date
}

// Main component to render the appropriate view based on the viewMode
const RenderCurrentView: React.FC<RenderCurrentViewProps> = ({
  viewMode,
  entries,
  selectedDate,
  handleEditEntry,
  handleDeleteEntry,
  handleAddEntry,
  setViewMode,
  setSelectedDate,
}) => {
  // Use a switch statement to determine which view to render
  switch (viewMode) {
    case "dashboard":
      // Render the DashboardOverview component for the dashboard view
      return (
        <DashboardOverview
          entries={entries}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
          onAddEntry={handleAddEntry}
        />
      );
    case "daily":
      // Render the DailyView component for the daily view
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
      // Render the WeeklyView component for the weekly view
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
      // Render the BiWeeklyView component for the biweekly view
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
      // Render the MonthlyView component for the monthly view
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
      // Render the YearlyView component for the yearly view
      return (
        <YearlyView
          entries={entries}
          selectedDate={selectedDate}
          onAddEntry={handleAddEntry}
          onNavigate={(mode, date) => {
            setViewMode(mode); // Update the view mode when navigating
            setSelectedDate(date); // Update the selected date when navigating
          }}
        />
      );
    case "custom":
      // Render the CustomRangeView component for a custom date range view
      return (
        <CustomRangeView
          entries={entries}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
          onAddEntry={handleAddEntry}
        />
      );
    default:
      // Return null if no valid viewMode is provided
      return null;
  }
};

// Export the component for use in other parts of the application
export default RenderCurrentView;
