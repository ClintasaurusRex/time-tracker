import type { TimeEntry } from "../types";
import { getTotalHours } from "../utils/dateUtils";
import EntryCard from "./EntryCard";
import "./DayModal.css";

interface DayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  entries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (id: string) => void;
  onAddEntry: () => void;
}

function DayModal({
  isOpen,
  onClose,
  selectedDate,
  entries,
  onEditEntry,
  onDeleteEntry,
  onAddEntry,
}: DayModalProps) {
  if (!isOpen) return null;

  const totalHours = getTotalHours(entries);
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="day-modal-overlay" onClick={handleOverlayClick}>
      <div className="day-modal-container">
        <div className="day-modal-header">
          <div className="day-modal-title">
            <h2>{formattedDate}</h2>
            <div className="day-modal-stats">
              <span className="total-hours">{totalHours.toFixed(1)} hours</span>
              <span className="entry-count">{entries.length} entries</span>
            </div>
          </div>
          <button className="day-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="day-modal-content">
          <div className="day-modal-actions">
            <button onClick={onAddEntry} className="add-entry-btn">
              + Add Entry for This Day
            </button>
          </div>

          <div className="day-entries-section">
            {entries.length === 0 ? (
              <div className="no-entries">
                <p>No entries for this day</p>
                <button onClick={onAddEntry} className="add-first-entry-btn">
                  Add First Entry
                </button>
              </div>
            ) : (
              <div className="day-entries-list">
                {entries.map((entry) => (
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
      </div>
    </div>
  );
}

export default DayModal;
