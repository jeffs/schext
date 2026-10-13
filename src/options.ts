import { loadDueTime, saveDueTime } from "./preference";

const input = document.querySelector<HTMLInputElement>("#due-time")!;
const status = document.querySelector<HTMLElement>("#status")!;

input.value = await loadDueTime();
input.addEventListener("change", async () => {
  if (!input.value) return;
  await saveDueTime(input.value);
  status.textContent = "Saved.";
});
