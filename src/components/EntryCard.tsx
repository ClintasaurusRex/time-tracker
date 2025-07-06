import type { TimeEntry } from '../types';
import './EntryCard.css';

interface EntryCardProps {
  entry: TimeEntry;
  onEdit: (entry: TimeEntry) => void;
  onDelete: (id: string) => void;
}

function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDelete(entry.id);
    }
  };

  return (
    <div className="entry-card">
      <div className="entry-header">
        <div className="entry-date">{entry.date}</div>
        <div className="entry-hours">{entry.hours}h</div>
      </div>
      
      <div className="entry-task">{entry.task}</div>
      
      <div className="entry-actions">
        <button onClick={() => onEdit(entry)} className="btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default EntryCard;
