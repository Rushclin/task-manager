import { TaskDto } from "@/app/tasks/types";

const TASKS_STORAGE_KEY = "tasks";

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function formatDateRange(
  startTimestamp: string | number,
  endTimestamp: string | number,
): { day: string; dateRange: string } {
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

  const startTime = `${startDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")}`;
  const endTime = `${endDate.getHours().toString().padStart(2, "0")}:${endDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  if (startDate.getTime() >= todayStart) {
    return { dateRange: `${startTime} - ${endTime}`, day: "Today" };
  } else if (startDate.getTime() >= yesterdayStart) {
    return { dateRange: `${startTime} - ${endTime}`, day: "Yesterday" };
  } else {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = daysOfWeek[startDate.getDay()];
    return {
      dateRange: `${startTime} - ${endTime}`,
      day: `${day}`,
    };
  }
}

export function getFormattedDate(): string {
  const today = new Date();

  const day = today.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  return `Today, ${day} ${month} ${year}`;
}

export function saveTasksToLocalStorage(tasks: TaskDto[]) {
  if (typeof window !== "undefined")
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage(): TaskDto[] {
  if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
}
