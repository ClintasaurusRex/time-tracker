import { useMemo } from "react";
import type { TimeEntry } from "../types";
import {
  getStartOfWeek,
  addDays,
  filterEntriesByDate,
  getTotalHours,
  groupEntriesByDate,
} from "../utils/dateUtils";
import PeriodSummary from "../components/PeriodSummary";
import EmptyState from "../components/EmptyState";
import DayModal from "../components/DayModal";
import "./WeeklyView.css";

interface BiWeeklyViewProps {
  entries: TimeEntry[];
  selectedDate: Date;
  onAddEntry: () => void;
}

function BiWeeklyView({ entries, selectedDate, onAddEntry }: BiWeeklyViewProps) {
  // Start at the beginning of the week for bi-weekly period
  const biWeekStart = useMemo(() => getStartOfWeek(selectedDate), [selectedDate]);
  const biWeekEnd = useMemo(() => addDays(biWeekStart, 13), [biWeekStart]);

  const biWeekEntries = useMemo(() => {
    return filterEntriesByDate(entries, biWeekStart, biWeekEnd);
  }, [entries, biWeekStart, biWeekEnd]);

  const totalHours = useMemo(() => getTotalHours(biWeekEntries), [biWeekEntries]);
  const entriesByDate = useMemo(() => groupEntriesByDate(biWeekEntries), [biWeekEntries]);

  const formatPeriod = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${startStr} - ${endStr}`;
  };

  const getDayEntries = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return entriesByDate[dateStr] || [];
  };

  const biWeekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      days.push(addDays(biWeekStart, i));
    }
    return days;
  }, [biWeekStart]);

  const handleCloseModal = () => {
    // Logic to close the modal if needed
  };

  return (
    <div className="weekly-view">
      <PeriodSummary
        title="Bi-Weekly Summary"
        totalHours={totalHours}
        entryCount={biWeekEntries.length}
        period={formatPeriod(biWeekStart, biWeekEnd)}
      />

      <div className="weekly-actions">
        <button onClick={onAddEntry} className="add-entry-btn">
          + Add Entry
        </button>
      </div>

      {biWeekEntries.length === 0 ? (
        <EmptyState
          title="No entries for this bi-weekly period"
          message="Start tracking your time by adding entries for this bi-weekly period."
          actionText="Add First Entry"
          onAction={onAddEntry}
        />
      ) : (
        <div className="week-grid">
          {biWeekDays.map((date) => {
            const dayEntries = getDayEntries(date);
            const dayTotal = getTotalHours(dayEntries);
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div key={date.toISOString()} className={`day-card ${isToday ? "today" : ""}`}>
                <div className="day-header">
                  <div className="day-name">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="day-date">
                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>

                <div className="day-hours">{dayTotal > 0 ? `${dayTotal.toFixed(1)}h` : "0h"}</div>

                <div className="day-entries">
                  {dayEntries.length > 0 ? (
                    <div className="entries-count">
                      {dayEntries.length} {dayEntries.length === 1 ? "entry" : "entries"}
                    </div>
                  ) : (
                    <div className="no-entries">No entries</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BiWeeklyView;
