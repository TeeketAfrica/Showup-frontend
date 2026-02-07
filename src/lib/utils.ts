import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTo12HourTime(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}


export function maskPhoneNumber(phone: string): string {
  if (!phone) return "";

  // Remove spaces, dashes, etc.
  const cleaned = phone.replace(/\D/g, "");

  // We expect at least 11 digits (typical NG number)
  if (cleaned.length < 7) {
    throw new Error("Invalid phone number");
  }

  const firstPart = cleaned.slice(0, 4);

  return `${firstPart} *** ****`;
}
