// Import necessary dependencies and utilities
import { useState } from "react";
import type { TimeEntry, ViewMode } from "../types";
import { useTimeEntries } from "../hooks/useTimeEntries";
import { addDays, addWeeks, addMonths, addYears } from "../utils/dateUtils";

// Import child components used in the Dashboard
import EntryForm from "./EntryForm";
import NavigationControls from "./NavigationControls";
import RenderCurrentView from "./RenderCurrentView";

import "./Dashboard.css"; // Import styles for the Dashboard component

function Dashboard() {
  // State management for the Dashboard
  const { entries, addEntry, updateEntry, deleteEntry } = useTimeEntries(); // Manage time entries
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard"); // Current view mode
  const [selectedDate, setSelectedDate] = useState(new Date()); // Currently selected date
  const [showEntryForm, setShowEntryForm] = useState(false); // Controls visibility of the entry form modal
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null); // Entry being edited

  // Handlers for view mode changes
  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // Handlers for adding, editing, and deleting entries
  const handleAddEntry = () => {
    setEditingEntry(null); // Reset editing entry
    setShowEntryForm(true); // Show the entry form modal
  };

  const handleEditEntry = (entry: TimeEntry) => {
    setEditingEntry(entry); // Set the entry to be edited
    setShowEntryForm(true); // Show the entry form modal
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id); // Delete the entry by ID
  };

  // Handlers for form submission and cancellation
  const handleFormSubmit = (entry: TimeEntry) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, entry); // Update the existing entry
    } else {
      addEntry(entry); // Add a new entry
    }
    setShowEntryForm(false); // Close the entry form modal
    setEditingEntry(null); // Reset editing entry
  };

  const handleFormCancel = () => {
    setShowEntryForm(false); // Close the entry form modal
    setEditingEntry(null); // Reset editing entry
  };

  // Handlers for navigating between periods
  const handlePreviousPeriod = () => {
    switch (viewMode) {
      case "daily":
        setSelectedDate((prev) => addDays(prev, -1)); // Go to the previous day
        break;
      case "weekly":
      case "biweekly":
        setSelectedDate((prev) => addWeeks(prev, viewMode === "biweekly" ? -2 : -1)); // Go to the previous week/bi-week
        break;
      case "monthly":
        setSelectedDate((prev) => addMonths(prev, -1)); // Go to the previous month
        break;
      case "yearly":
        setSelectedDate((prev) => addYears(prev, -1)); // Go to the previous year
        break;
    }
  };

  const handleNextPeriod = () => {
    switch (viewMode) {
      case "daily":
        setSelectedDate((prev) => addDays(prev, 1)); // Go to the next day
        break;
      case "weekly":
      case "biweekly":
        setSelectedDate((prev) => addWeeks(prev, viewMode === "biweekly" ? 2 : 1)); // Go to the next week/bi-week
        break;
      case "monthly":
        setSelectedDate((prev) => addMonths(prev, 1)); // Go to the next month
        break;
      case "yearly":
        setSelectedDate((prev) => addYears(prev, 1)); // Go to the next year
        break;
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date()); // Reset to today's date
  };

  // Get the text representation of the current period based on the view mode
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
        return "Dashboard"; // Default text for the dashboard view
    }
  };

  return (
    <div className="dashboard-container">
      {/* Vertical Navigation Bar */}
      <ul className="navbar">
        <img src="/logoEmblem.png" alt="Placeholder" className="nav-pic" />
        {/* Navigation buttons for different views */}
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

        {/* Additional buttons for linking Google Calendar and settings */}
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
          <h1>{getCurrentPeriodText()}</h1> {/* Display the current period text */}
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
        <div className="view-container">
          <RenderCurrentView
            viewMode={viewMode}
            entries={entries}
            selectedDate={selectedDate}
            handleEditEntry={handleEditEntry}
            handleDeleteEntry={handleDeleteEntry}
            handleAddEntry={handleAddEntry}
            setViewMode={setViewMode}
            setSelectedDate={setSelectedDate}
          />
        </div>
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

// Export the Dashboard component for use in other parts of the application
export default Dashboard;
