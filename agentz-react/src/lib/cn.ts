import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Aceternity's classnames helper. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
