import { useState, useEffect } from "react";
import type { TimeEntry } from "../types";
import { generateId } from "../utils/dateUtils";
import "./EntryForm.css";

interface EntryFormProps {
  onSubmit: (entry: TimeEntry) => void;
  onCancel: () => void;
  initialEntry?: TimeEntry;
}

function EntryForm({ onSubmit, onCancel, initialEntry }: EntryFormProps) {
  const [date, setDate] = useState(
    initialEntry?.date || new Date().toISOString().split("T")[0]
  );
  const [hours, setHours] = useState(initialEntry?.hours?.toString() || "");
  const [startTime, setStartTime] = useState(
    initialEntry?.startTime || new Date().toTimeString().slice(0, 5)
  );
  const [endTime, setEndTime] = useState(initialEntry?.endTime || "");
  const [task, setTask] = useState(initialEntry?.task || "");

  // Sync: hours → endTime
  useEffect(() => {
    if (!hours) {
      setEndTime("");
      return;
    }
    if (!isNaN(Number(hours))) {
      const start = new Date(`${date}T${startTime}`);
      const newEnd = new Date(start.getTime() + Number(hours) * 60 * 60 * 1000);
      setEndTime(newEnd.toTimeString().slice(0, 5));
    }
  }, [hours, startTime, date, endTime]);

  // Sync: endTime → hours
  useEffect(() => {
    if (!endTime) {
      setHours("");
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (end < start) {
      end.setDate(end.getDate() + 1);
    }

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (!isNaN(diff)) {
      setHours(diff.toFixed(1));
    }
  }, [endTime, startTime, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !hours || !startTime || !endTime || !task) {
      alert("Please fill in all fields");
      return;
    }

    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) {
      alert("Please enter valid hours");
      return;
    }

    const entry: TimeEntry = {
      id: initialEntry?.id || generateId(),
      date,
      hours: hoursNum,
      startTime,
      endTime,
      task,
    };
    console.log("Submitting entry:", entry);
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
              onBlur={() => {
                if (!isNaN(Number(hours)) && hours !== "") {
                  setHours(Number(hours).toFixed(1));
                }
              }}
              min="0.1"
              step="0.1"
              placeholder="e.g., 8.5"
              required
            />
          </div>

          <div className="form-group">
            <div className="form-time-inputs">
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <label htmlFor="endTime">End Time:</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                required
              />
            </div>
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
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EntryForm;
