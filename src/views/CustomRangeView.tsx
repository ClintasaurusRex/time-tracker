import { useState, useMemo } from "react";
import type { TimeEntry } from "../types";
import { filterEntriesByDate, getTotalHours } from "../utils/dateUtils";
import PeriodSummary from "../components/PeriodSummary";
import EntryCard from "../components/EntryCard";
import EmptyState from "../components/EmptyState";
import "./CustomRangeView.css";

interface CustomRangeViewProps {
  entries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (id: string) => void;
  onAddEntry: () => void;
}

function CustomRangeView({
  entries,
  onEditEntry,
  onDeleteEntry,
  onAddEntry,
}: CustomRangeViewProps) {
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const filteredEntries = useMemo(() => {
    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T23:59:59");
    return filterEntriesByDate(entries, start, end);
  }, [entries, startDate, endDate]);

  const totalHours = useMemo(() => getTotalHours(filteredEntries), [filteredEntries]);

  const formatDateRange = (start: string, end: string) => {
    const startFormatted = new Date(start).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const endFormatted = new Date(end).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (start === end) {
      return startFormatted;
    }

    return `${startFormatted} - ${endFormatted}`;
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredEntries, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `time-entries-${startDate}-to-${endDate}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="custom-range-view">
      <div className="date-range-controls">
        <div className="date-inputs">
          <div className="date-input-group">
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate}
            />
          </div>

          <div className="date-input-group">
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        </div>

        <div className="range-actions">
          <button onClick={onAddEntry} className="add-entry-btn">
            + Add Entry
          </button>
          <button
            onClick={handleExport}
            className="export-btn"
            disabled={filteredEntries.length === 0}
          >
            Export Data
          </button>
        </div>
      </div>

      <PeriodSummary
        title="Custom Range Summary"
        totalHours={totalHours}
        entryCount={filteredEntries.length}
        period={formatDateRange(startDate, endDate)}
      />

      <div className="entries-section">
        {filteredEntries.length === 0 ? (
          <EmptyState
            title="No entries found"
            message="No time entries found for the selected date range. Try adjusting your date range or add some entries."
            actionText="Add Entry"
            onAction={onAddEntry}
          />
        ) : (
          <div className="entries-list">
            {filteredEntries
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  onEdit={onEditEntry}
                  onDelete={onDeleteEntry}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomRangeView;
