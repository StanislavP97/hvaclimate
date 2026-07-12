export function isValidAddress(value: string): boolean {
  return value.trim().length >= 5;
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const areaCode = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);

  if (digits.length <= 3) return areaCode;
  if (digits.length <= 6) return `(${areaCode}) ${prefix}`;
  return `(${areaCode}) ${prefix}-${line}`;
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length === 10;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
