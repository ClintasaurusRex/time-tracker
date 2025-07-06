import { useState, useEffect } from "react";
import type { TimeEntry } from "../types";

export const useTimeEntries = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load entries from localStorage on component mount
  useEffect(() => {
    console.log("Loading entries from localStorage...");
    const savedEntries = localStorage.getItem("timeEntries");
    console.log("Raw localStorage data:", savedEntries);
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      console.log("Parsed entries:", parsedEntries);
      setEntries(parsedEntries);
    }
    setIsLoaded(true);
    console.log("Initial load complete");
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
