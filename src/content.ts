import { loadDueTime, onDueTimeChanged, toSchoology } from "./preference";

const schoologyDefault = "11:59PM";
const timeFields =
  "input[name='due_date[time]'], input[name$='[due][due_date][time]']";

// The value each time field held when last checked.
const lastSeen = new WeakMap<HTMLInputElement, string>();

// Schoology fills unsaved due times with its default: asynchronously when a
// date is entered, or before the field is first seen in forms opened from the
// calendar. Saved times arrive in the HTML value attribute.
function holdsSchoologyDefault(field: HTMLInputElement): boolean {
  if (field.value !== schoologyDefault) return false;
  const previous = lastSeen.get(field);
  return previous === "" ||
    (previous === undefined && !field.getAttribute("value"));
}

function check(preferred: string): void {
  for (const field of document.querySelectorAll<HTMLInputElement>(timeFields)) {
    if (holdsSchoologyDefault(field)) {
      field.value = preferred;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
    lastSeen.set(field, field.value);
  }
}

loadDueTime().then((time) => {
  let preferred = toSchoology(time);
  onDueTimeChanged((time) => preferred = toSchoology(time));
  setInterval(() => check(preferred), 100);
});
