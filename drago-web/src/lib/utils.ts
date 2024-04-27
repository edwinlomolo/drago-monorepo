import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function userAvatarFallback(firstname: string | undefined, lastname: string | undefined): string {
  let name: string = ""
  if (typeof firstname !== 'undefined' && typeof lastname !== 'undefined') {
    name = name+name.concat(firstname[0], lastname[0])
    return name
  } else if (typeof firstname === 'undefined' && typeof lastname !== 'undefined') {
    name = name+name.concat(lastname[0])
    return name
  } else if (typeof lastname === 'undefined' && typeof firstname !== 'undefined') {
    name = name+name.concat(firstname[0])
    return name
  }
  return name
}
