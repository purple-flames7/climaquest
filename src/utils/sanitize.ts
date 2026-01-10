/**
 * Sanitizes user input string for safe comparison or storage.
 *
 * - Removes scripts and HTML tags
 * - Normalizes accents
 * - Removes non-alphanumeric characters (except spaces)
 * - Converts to lowercase
 * - Collapses multiple spaces into one
 *
 * @param text - Raw user input
 * @returns Sanitized string
 */
export const sanitizeInput = (text: string): string => {
  if (!text) return "";

  return (
    text
      // Remove any <script> tags and their content
      .replace(/<script.*?>.*?<\/script>/gi, "")
      // Remove all other HTML tags
      .replace(/<[^>]+>/g, "")
      // Normalize accented characters (e.g., é → e)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Remove non-alphanumeric characters except spaces
      .replace(/[^a-zA-Z0-9\s]/g, "")
      // Trim leading/trailing spaces
      .trim()
      // Convert to lowercase
      .toLowerCase()
      // Collapse multiple spaces into a single space
      .replace(/\s+/g, " ")
  );
};
