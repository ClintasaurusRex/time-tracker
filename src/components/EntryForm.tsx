import { useState } from "react";
import type { TimeEntry } from "../types";
import { generateId } from "../utils/dateUtils";
import "./EntryForm.css";

interface EntryFormProps {
  onSubmit: (entry: TimeEntry) => void;
  onCancel: () => void;
  initialEntry?: TimeEntry;
}

function EntryForm({ onSubmit, onCancel, initialEntry }: EntryFormProps) {
  const [date, setDate] = useState(initialEntry?.date || new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState(initialEntry?.hours?.toString() || "");
  const [task, setTask] = useState(initialEntry?.task || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !hours || !task) {
      alert("Please fill in all fields");
      return;
    }

    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      alert("Please enter valid hours");
      return;
    }

    const entry: TimeEntry = {
      id: initialEntry?.id || generateId(),
      date,
      hours: hoursNum,
      task,
    };

    onSubmit(entry);
  };

  return (
    <div className="entry-form-overlay">
      <div className="entry-form-container">
        <h2>{initialEntry ? "Edit Entry" : "Add New Entry"}</h2>
        <form onSubmit={handleSubmit} className="entry-form">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="hours">Hours:</label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min="0.1"
              step="0.1"
              placeholder="e.g., 8.5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="task">Task Description:</label>
            <textarea
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe what you worked on..."
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {initialEntry ? "Update Entry" : "Add Entry"}
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EntryForm;
