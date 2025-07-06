import { useMemo } from "react";
import type { TimeEntry } from "../types";
import {
  getStartOfYear,
  getEndOfYear,
  filterEntriesByDate,
  getTotalHours,
} from "../utils/dateUtils";
import PeriodSummary from "../components/PeriodSummary";
import EmptyState from "../components/EmptyState";
import "./YearlyView.css";

interface YearlyViewProps {
  entries: TimeEntry[];
  selectedDate: Date;
  onAddEntry: () => void;
}

function YearlyView({ entries, selectedDate, onAddEntry }: YearlyViewProps) {
  const yearStart = useMemo(() => getStartOfYear(selectedDate), [selectedDate]);
  const yearEnd = useMemo(() => getEndOfYear(selectedDate), [selectedDate]);

  const yearEntries = useMemo(() => {
    return filterEntriesByDate(entries, yearStart, yearEnd);
  }, [entries, yearStart, yearEnd]);

  const totalHours = useMemo(() => getTotalHours(yearEntries), [yearEntries]);

  const formatYearPeriod = (date: Date) => {
    return date.getFullYear().toString();
  };

  const monthlyData = useMemo(() => {
    const months = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(selectedDate.getFullYear(), month, 1);
      const monthEnd = new Date(selectedDate.getFullYear(), month + 1, 0);

      const monthEntries = filterEntriesByDate(entries, monthStart, monthEnd);
      const monthHours = getTotalHours(monthEntries);

      months.push({
        name: monthNames[month],
        short: monthNames[month].substring(0, 3),
        hours: monthHours,
        entries: monthEntries.length,
        date: monthStart,
      });
    }

    return months;
  }, [selectedDate, entries]);

  return (
    <div className="yearly-view">
      <PeriodSummary
        title="Yearly Summary"
        totalHours={totalHours}
        entryCount={yearEntries.length}
        period={formatYearPeriod(selectedDate)}
      />

      <div className="yearly-actions">
        <button onClick={onAddEntry} className="add-entry-btn">
          + Add Entry
        </button>
      </div>

      {yearEntries.length === 0 ? (
        <EmptyState
          title="No entries for this year"
          message="Start tracking your time by adding entries for this year."
          actionText="Add First Entry"
          onAction={onAddEntry}
        />
      ) : (
        <div className="months-grid">
          {monthlyData.map((month) => {
            const isCurrentMonth =
              month.date.getMonth() === new Date().getMonth() &&
              month.date.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={month.name}
                className={`month-card ${isCurrentMonth ? "current-month" : ""}`}
              >
                <div className="month-header">
                  <div className="month-name">{month.name}</div>
                  <div className="month-year">{month.date.getFullYear()}</div>
                </div>

                <div className="month-hours">
                  {month.hours > 0 ? `${month.hours.toFixed(1)}h` : "0h"}
                </div>

                <div className="month-entries">
                  {month.entries > 0 ? (
                    <div className="entries-count">
                      {month.entries} {month.entries === 1 ? "entry" : "entries"}
                    </div>
                  ) : (
                    <div className="no-entries">No entries</div>
                  )}
                </div>

                {month.hours > 0 && (
                  <div className="month-bar">
                    <div
                      className="month-bar-fill"
                      style={{
                        width: `${Math.min(
                          (month.hours / Math.max(...monthlyData.map((m) => m.hours))) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default YearlyView;
