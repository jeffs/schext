// The preferred due time, stored as 24-hour "HH:MM", the format of
// <input type="time">.

const key = "dueTime";
export const defaultDueTime = "08:25";

export async function loadDueTime(): Promise<string> {
  const stored = await chrome.storage.sync.get(key);
  const value = stored[key];
  return typeof value === "string" ? value : defaultDueTime;
}

export function saveDueTime(time: string): Promise<void> {
  return chrome.storage.sync.set({ [key]: time });
}

export function onDueTimeChanged(listener: (time: string) => void): void {
  chrome.storage.onChanged.addListener((changes, area) => {
    const change = changes[key];
    if (area === "sync" && change) {
      listener(typeof change.newValue === "string"
        ? change.newValue
        : defaultDueTime);
    }
  });
}

// Converts "HH:MM" to Schoology's "hh:mmAM" or "hh:mmPM".
export function toSchoology(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const hour = String(hours % 12 || 12).padStart(2, "0");
  const minute = String(minutes).padStart(2, "0");
  return `${hour}:${minute}${hours < 12 ? "AM" : "PM"}`;
}
