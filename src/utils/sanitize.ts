export const sanitizeInput = (text: string): string => {
  if (!text) return "";

  return text
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};
