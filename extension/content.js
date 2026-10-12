const schoologyDefault = "11:59PM";
const preferred = "08:25AM";
const timeFields = "input[name='due_date[time]']";

// The value each time field held when last checked. Schoology asynchronously
// fills an empty time with its default when a date is entered, so only an
// empty-to-default transition is replaced; existing and typed times are kept.
const lastSeen = new WeakMap();

function check() {
  for (const field of document.querySelectorAll(timeFields)) {
    if (lastSeen.get(field) === "" && field.value === schoologyDefault) {
      field.value = preferred;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
    lastSeen.set(field, field.value);
  }
}

setInterval(check, 100);
