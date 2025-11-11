import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

/**
 * useLocalStorage<T>
 * A hook that persists state to localStorage and mimics React's useState API.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // Read value once during initial render
  const readValue = (): T => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Setter that updates both state and localStorage
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    setStoredValue((prev) => {
      const valueToStore =
        typeof value === "function"
          ? (value as (prevState: T) => T)(prev)
          : value;

      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }

      return valueToStore;
    });
  };

  // Re-read from localStorage if the key changes
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Optional: listen for localStorage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
