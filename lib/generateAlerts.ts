import type { AlertItem } from "@/components/charts/AlertsModal";

const alertMessages: AlertItem["message"][] = [
  "Cut plan",
  "Calibrate",
  "Clean nozzle",
];

function generateRandomTime() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}:${String(second).padStart(2, "0")}`;
}

function getCurrentDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function generateAlerts(): AlertItem[] {
  const currentDate = getCurrentDate();

  return Array.from(
    { length: 20 },
    (_, index): AlertItem => ({
      id: index + 1,
      date: `${currentDate} ${generateRandomTime()}`,
      type: "Info",
      message:
        alertMessages[
          Math.floor(Math.random() * alertMessages.length)
        ],
    })
  ).sort((a, b) => b.date.localeCompare(a.date));
}