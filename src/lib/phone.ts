export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/-/g, "")}`;
}

export function toSmsHref(phone: string): string {
  return `sms:${phone.replace(/-/g, "")}`;
}
