import { useState, useEffect } from "react";
import type { TimeEntry } from "../types";

export const useTimeEntries = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("timeEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    setIsLoaded(true);
  }, []);

  // Save entries to localStorage whenever entries change (but only after initial load)
  useEffect(() => {
    console.log("Entries changed, isLoaded:", isLoaded, "entries.length:", entries.length);
    if (isLoaded) {
      console.log("Saving entries to localStorage:", entries);
      localStorage.setItem("timeEntries", JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const addEntry = (entry: TimeEntry) => {
    setEntries((prev) => [...prev, entry]);
  };

  const updateEntry = (id: string, updatedEntry: Partial<TimeEntry>) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};
