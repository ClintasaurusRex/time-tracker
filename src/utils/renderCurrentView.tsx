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

import { useTimeEntries } from "../hooks/useTimeEntries";

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

export default function renderCurrentView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");

  const { entries, addEntry, updateEntry, deleteEntry } = useTimeEntries();
  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleAddEntry = () => {
    setEditingEntry(null);
    setShowEntryForm(true);
  };

  const handleEditEntry = (entry: TimeEntry) => {
    setEditingEntry(entry);
    setShowEntryForm(true);
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
  };

  const handleFormSubmit = (entry: TimeEntry) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, entry);
    } else {
      addEntry(entry);
    }
    setShowEntryForm(false);
    setEditingEntry(null);
  };

  const handleFormCancel = () => {
    setShowEntryForm(false);
    setEditingEntry(null);
  };

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
}
