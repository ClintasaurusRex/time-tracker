import { useMemo } from 'react';
import type { TimeEntry } from '../types';
import { filterEntriesByDate, getTotalHours } from '../utils/dateUtils';
import PeriodSummary from '../components/PeriodSummary';
import EntryCard from '../components/EntryCard';
import EmptyState from '../components/EmptyState';
import './DailyView.css';

interface DailyViewProps {
  entries: TimeEntry[];
  selectedDate: Date;
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (id: string) => void;
  onAddEntry: () => void;
}

function DailyView({ entries, selectedDate, onEditEntry, onDeleteEntry, onAddEntry }: DailyViewProps) {
  const dayEntries = useMemo(() => {
    const endDate = new Date(selectedDate);
    return filterEntriesByDate(entries, selectedDate, endDate);
  }, [entries, selectedDate]);

  const totalHours = useMemo(() => getTotalHours(dayEntries), [dayEntries]);

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="daily-view">
      <PeriodSummary
        title="Daily Summary"
        totalHours={totalHours}
        entryCount={dayEntries.length}
        period={formatDateForDisplay(selectedDate)}
      />

      <div className="daily-actions">
        <button onClick={onAddEntry} className="add-entry-btn">
          + Add Entry
        </button>
      </div>

      <div className="entries-list">
        {dayEntries.length === 0 ? (
          <EmptyState
            title="No entries for this day"
            message="Start tracking your time by adding your first entry for today."
            actionText="Add First Entry"
            onAction={onAddEntry}
          />
        ) : (
          dayEntries.map(entry => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onEdit={onEditEntry}
              onDelete={onDeleteEntry}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DailyView;
