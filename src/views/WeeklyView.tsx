import { useMemo } from 'react';
import type { TimeEntry } from '../types';
import { 
  getStartOfWeek, 
  getEndOfWeek, 
  filterEntriesByDate, 
  getTotalHours,
  groupEntriesByDate,
  addDays 
} from '../utils/dateUtils';
import PeriodSummary from '../components/PeriodSummary';
import EmptyState from '../components/EmptyState';
import './WeeklyView.css';

interface WeeklyViewProps {
  entries: TimeEntry[];
  selectedDate: Date;
  onAddEntry: () => void;
}

function WeeklyView({ entries, selectedDate, onAddEntry }: WeeklyViewProps) {
  const weekStart = useMemo(() => getStartOfWeek(selectedDate), [selectedDate]);
  const weekEnd = useMemo(() => getEndOfWeek(selectedDate), [selectedDate]);
  
  const weekEntries = useMemo(() => {
    return filterEntriesByDate(entries, weekStart, weekEnd);
  }, [entries, weekStart, weekEnd]);

  const totalHours = useMemo(() => getTotalHours(weekEntries), [weekEntries]);
  const entriesByDate = useMemo(() => groupEntriesByDate(weekEntries), [weekEntries]);

  const formatWeekPeriod = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  const getDayEntries = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return entriesByDate[dateStr] || [];
  };

  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }
    return days;
  }, [weekStart]);

  return (
    <div className="weekly-view">
      <PeriodSummary
        title="Weekly Summary"
        totalHours={totalHours}
        entryCount={weekEntries.length}
        period={formatWeekPeriod(weekStart, weekEnd)}
      />

      <div className="weekly-actions">
        <button onClick={onAddEntry} className="add-entry-btn">
          + Add Entry
        </button>
      </div>

      {weekEntries.length === 0 ? (
        <EmptyState
          title="No entries for this week"
          message="Start tracking your time by adding entries for this week."
          actionText="Add First Entry"
          onAction={onAddEntry}
        />
      ) : (
        <div className="week-grid">
          {weekDays.map(date => {
            const dayEntries = getDayEntries(date);
            const dayTotal = getTotalHours(dayEntries);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div key={date.toISOString()} className={`day-card ${isToday ? 'today' : ''}`}>
                <div className="day-header">
                  <div className="day-name">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="day-date">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="day-hours">
                  {dayTotal > 0 ? `${dayTotal.toFixed(1)}h` : '0h'}
                </div>
                
                <div className="day-entries">
                  {dayEntries.length > 0 ? (
                    <div className="entries-count">
                      {dayEntries.length} {dayEntries.length === 1 ? 'entry' : 'entries'}
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

export default WeeklyView;
