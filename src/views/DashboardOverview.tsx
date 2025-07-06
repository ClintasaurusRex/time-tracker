import { useMemo } from 'react';
import type { TimeEntry } from '../types';
import { 
  filterEntriesByDate, 
  getTotalHours,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth
} from '../utils/dateUtils';
import EntryCard from '../components/EntryCard';
import EmptyState from '../components/EmptyState';
import './DashboardOverview.css';

interface DashboardOverviewProps {
  entries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (id: string) => void;
  onAddEntry: () => void;
}

function DashboardOverview({ entries, onEditEntry, onDeleteEntry, onAddEntry }: DashboardOverviewProps) {
  const today = useMemo(() => new Date(), []);
  const weekStart = useMemo(() => getStartOfWeek(today), [today]);
  const weekEnd = useMemo(() => getEndOfWeek(today), [today]);
  const monthStart = useMemo(() => getStartOfMonth(today), [today]);
  const monthEnd = useMemo(() => getEndOfMonth(today), [today]);

  // Today's entries
  const todayEntries = useMemo(() => {
    return filterEntriesByDate(entries, today, today);
  }, [entries, today]);

  // This week's entries
  const weekEntries = useMemo(() => {
    return filterEntriesByDate(entries, weekStart, weekEnd);
  }, [entries, weekStart, weekEnd]);

  // This month's entries
  const monthEntries = useMemo(() => {
    return filterEntriesByDate(entries, monthStart, monthEnd);
  }, [entries, monthStart, monthEnd]);

  // Recent entries (last 5)
  const recentEntries = useMemo(() => {
    return [...entries]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [entries]);

  const todayHours = useMemo(() => getTotalHours(todayEntries), [todayEntries]);
  const weekHours = useMemo(() => getTotalHours(weekEntries), [weekEntries]);
  const monthHours = useMemo(() => getTotalHours(monthEntries), [monthEntries]);

  const formatDateRange = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <button onClick={onAddEntry} className="add-entry-btn">
          + Add Entry
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card today">
          <div className="stat-header">
            <h3>Today</h3>
            <div className="stat-date">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
          </div>
          <div className="stat-value">{todayHours.toFixed(1)}h</div>
          <div className="stat-detail">{todayEntries.length} entries</div>
        </div>

        <div className="stat-card week">
          <div className="stat-header">
            <h3>This Week</h3>
            <div className="stat-date">{formatDateRange(weekStart, weekEnd)}</div>
          </div>
          <div className="stat-value">{weekHours.toFixed(1)}h</div>
          <div className="stat-detail">{weekEntries.length} entries</div>
        </div>

        <div className="stat-card month">
          <div className="stat-header">
            <h3>This Month</h3>
            <div className="stat-date">{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
          </div>
          <div className="stat-value">{monthHours.toFixed(1)}h</div>
          <div className="stat-detail">{monthEntries.length} entries</div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Recent Entries</h3>
        {recentEntries.length === 0 ? (
          <EmptyState
            title="No entries yet"
            message="Start tracking your time by adding your first entry."
            actionText="Add First Entry"
            onAction={onAddEntry}
          />
        ) : (
          <div className="recent-entries">
            {recentEntries.map(entry => (
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

export default DashboardOverview;
