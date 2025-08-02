import { useState } from "react";
import type { TimeEntry, ViewMode } from "../types";
import { useTimeEntries } from "../hooks/useTimeEntries";
import { addDays, addWeeks, addMonths, addYears } from "../utils/dateUtils";

// Components
import EntryForm from "./EntryForm";
import NavigationControls from "./NavigationControls";

// Views
import DashboardOverview from "../views/DashboardOverview";
import DailyView from "../views/DailyView";
import WeeklyView from "../views/WeeklyView";
import MonthlyView from "../views/MonthlyView";
import YearlyView from "../views/YearlyView";
import CustomRangeView from "../views/CustomRangeView";
import BiWeeklyView from "../views/BiWeeklyView";

import "./Dashboard.css";

function Dashboard() {
  const { entries, addEntry, updateEntry, deleteEntry } = useTimeEntries();
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);

  // ...existing code...

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

  const handlePreviousPeriod = () => {
    switch (viewMode) {
      case "daily":
        setSelectedDate((prev) => addDays(prev, -1));
        break;
      case "weekly":
      case "biweekly":
        setSelectedDate((prev) => addWeeks(prev, viewMode === "biweekly" ? -2 : -1));
        break;
      case "monthly":
        setSelectedDate((prev) => addMonths(prev, -1));
        break;
      case "yearly":
        setSelectedDate((prev) => addYears(prev, -1));
        break;
    }
  };

  const handleNextPeriod = () => {
    switch (viewMode) {
      case "daily":
        setSelectedDate((prev) => addDays(prev, 1));
        break;
      case "weekly":
      case "biweekly":
        setSelectedDate((prev) => addWeeks(prev, viewMode === "biweekly" ? 2 : 1));
        break;
      case "monthly":
        setSelectedDate((prev) => addMonths(prev, 1));
        break;
      case "yearly":
        setSelectedDate((prev) => addYears(prev, 1));
        break;
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const getCurrentPeriodText = () => {
    switch (viewMode) {
      case "daily":
        return selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "weekly":
        return `Week of ${selectedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      case "biweekly":
        return `Bi-weekly period of ${selectedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      case "monthly":
        return selectedDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
      case "yearly":
        return selectedDate.getFullYear().toString();
      default:
        return "Dashboard";
    }
  };

  const renderCurrentView = () => {
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
          <WeeklyView entries={entries} selectedDate={selectedDate} onAddEntry={handleAddEntry} />
        );
      case "biweekly":
        return (
          <BiWeeklyView entries={entries} selectedDate={selectedDate} onAddEntry={handleAddEntry} />
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
          <YearlyView entries={entries} selectedDate={selectedDate} onAddEntry={handleAddEntry} />
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

  return (
    <div className="dashboard-container">
      {/* Vertical Navigation Bar */}
      <ul className="navbar">
        <img src="/logoEmblem.png" alt="Placeholder" className="nav-pic" />
        <button
          onClick={() => handleViewChange("dashboard")}
          className={`nav-btns ${viewMode === "dashboard" ? "active" : ""}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleViewChange("daily")}
          className={`nav-btns ${viewMode === "daily" ? "active" : ""}`}
        >
          Daily Logs
        </button>
        <button
          onClick={() => handleViewChange("weekly")}
          className={`nav-btns ${viewMode === "weekly" ? "active" : ""}`}
        >
          Weekly Summary
        </button>
        <button
          onClick={() => handleViewChange("biweekly")}
          className={`nav-btns ${viewMode === "biweekly" ? "active" : ""}`}
        >
          Bi-Weekly Summary
        </button>
        <button
          onClick={() => handleViewChange("monthly")}
          className={`nav-btns ${viewMode === "monthly" ? "active" : ""}`}
        >
          Monthly Summary
        </button>
        <button
          onClick={() => handleViewChange("yearly")}
          className={`nav-btns ${viewMode === "yearly" ? "active" : ""}`}
        >
          Yearly Summary
        </button>
        <button
          onClick={() => handleViewChange("custom")}
          className={`nav-btns ${viewMode === "custom" ? "active" : ""}`}
        >
          Custom Range
        </button>

        {/* This spacer will push the items below it to the bottom */}
        <div className="navbar-spacer"></div>

        <button
          onClick={() => {
            console.log("Link Google Cal button clicked");
          }}
          className="nav-btns"
        >
          Link Google Cal
        </button>
        <button
          onClick={() => {
            console.log("Settings button clicked");
          }}
          className="nav-btns"
        >
          Settings
        </button>
      </ul>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <h1>{getCurrentPeriodText()}</h1>
        </header>

        {/* Navigation Controls for non-dashboard views */}
        {viewMode !== "dashboard" && viewMode !== "custom" && (
          <div className="navigation-wrapper">
            <NavigationControls
              onPrevious={handlePreviousPeriod}
              onNext={handleNextPeriod}
              onToday={handleToday}
              currentPeriod={getCurrentPeriodText()}
            />
          </div>
        )}

        {/* Current View */}
        <div className="view-container">{renderCurrentView()}</div>
      </main>

      {/* Entry Form Modal */}
      {showEntryForm && (
        <EntryForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          initialEntry={editingEntry || undefined}
        />
      )}
    </div>
  );
}
export default Dashboard;
