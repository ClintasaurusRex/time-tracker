import { useMemo, useState } from "react";
import type { TimeEntry } from "../types";
import {
  getStartOfMonth,
  getEndOfMonth,
  filterEntriesByDate,
  getTotalHours,
  groupEntriesByDate,
} from "../utils/dateUtils";
import PeriodSummary from "../components/PeriodSummary";
import EmptyState from "../components/EmptyState";
import DayModal from "../components/DayModal";
import "./MonthlyView.css";

interface MonthlyViewProps {
  entries: TimeEntry[];
  selectedDate: Date;
  onAddEntry: () => void;
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (id: string) => void;
}

function MonthlyView({
  entries,
  selectedDate,
  onAddEntry,
  onEditEntry,
  onDeleteEntry,
}: MonthlyViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(null);

  const monthStart = useMemo(() => getStartOfMonth(selectedDate), [selectedDate]);
  const monthEnd = useMemo(() => getEndOfMonth(selectedDate), [selectedDate]);

  const monthEntries = useMemo(() => {
    return filterEntriesByDate(entries, monthStart, monthEnd);
  }, [entries, monthStart, monthEnd]);

  const totalHours = useMemo(() => getTotalHours(monthEntries), [monthEntries]);
  const entriesByDate = useMemo(() => groupEntriesByDate(monthEntries), [monthEntries]);

  const formatMonthPeriod = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getDayEntries = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return entriesByDate[dateStr] || [];
  };

  const handleDayClick = (date: Date) => {
    setSelectedDayDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDayDate(null);
  };

  const getSelectedDayEntries = () => {
    if (!selectedDayDate) return [];
    return getDayEntries(selectedDayDate);
  };

  const calendarDays = useMemo(() => {
    const days = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    // Add empty cells for days before the first day of the month
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
    }

    return days;
  }, [selectedDate]);

  return (
    <div className="monthly-view">
      <PeriodSummary
        title="Monthly Summary"
        totalHours={totalHours}
        entryCount={monthEntries.length}
        period={formatMonthPeriod(selectedDate)}
      />

      <div className="monthly-actions">
        <button onClick={onAddEntry} className="add-entry-btn">
          + Add Entry
        </button>
      </div>

      {monthEntries.length === 0 ? (
        <EmptyState
          title="No entries for this month"
          message="Start tracking your time by adding entries for this month."
          actionText="Add First Entry"
          onAction={onAddEntry}
        />
      ) : (
        <div className="calendar-container">
          <div className="calendar-header">
            <div className="weekday-header">Sun</div>
            <div className="weekday-header">Mon</div>
            <div className="weekday-header">Tue</div>
            <div className="weekday-header">Wed</div>
            <div className="weekday-header">Thu</div>
            <div className="weekday-header">Fri</div>
            <div className="weekday-header">Sat</div>
          </div>

          <div className="calendar-grid">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={index} className="empty-day"></div>;
              }

              const dayEntries = getDayEntries(date);
              const dayTotal = getTotalHours(dayEntries);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={date.toISOString()}
                  className={`calendar-day ${isToday ? "today" : ""}`}
                  onClick={() => handleDayClick(date)}
                >
                  <div className="day-number">{date.getDate()}</div>

                  {dayTotal > 0 && <div className="day-hours">{dayTotal.toFixed(1)}h</div>}
                  {dayEntries.length > 0 && (
                    <div className="day-entries-indicator">{dayEntries.length}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day Detail Modal */}
      {selectedDayDate && (
        <DayModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDayDate}
          entries={getSelectedDayEntries()}
          onEditEntry={onEditEntry}
          onDeleteEntry={onDeleteEntry}
          onAddEntry={onAddEntry}
        />
      )}
    </div>
  );
}

export default MonthlyView;
