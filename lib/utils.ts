import { clsx, type ClassValue } from "clsx";
import { Locale } from "next-intl";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format the timer as MM:SS
export const formatTimer = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return `${day}/${month}/${year} ${formattedTime}`;
}

export function dateTimeFormat(date: Date): string {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${weekday} ${day} ${month} ${year}`;
}

export function formatLocalizedDate(date: Date, language: Locale): string {
  const day = date.getDate();
  const year = date.getFullYear();

  const monthFormatter = new Intl.DateTimeFormat(language, { month: "long" });
  const month = monthFormatter.format(date);

  if (language === "ar") {
    return `${day} ${month} ${year}`;
  }

  return `${day} ${month} ${year}`;
}
