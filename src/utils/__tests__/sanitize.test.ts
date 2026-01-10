import { describe, it, expect } from "vitest";
import { sanitizeInput } from "../sanitize";

describe("sanitizeInput utility", () => {
  it("trims whitespace and converts text to lowercase", () => {
    expect(sanitizeInput("  Hello WORLD  ")).toBe("hello world");
  });

  it("collapses multiple spaces into a single space", () => {
    expect(sanitizeInput("Hello     there")).toBe("hello there");
  });

  it("removes accents and diacritics", () => {
    expect(sanitizeInput("Café")).toBe("cafe");
    expect(sanitizeInput("Niño")).toBe("nino");
  });

  it("removes potential HTML and script tags", () => {
    expect(sanitizeInput("<script>alert('x')</script>Test")).toBe("test");
  });

  it("removes special characters except alphanumeric and spaces", () => {
    expect(sanitizeInput("Climate! Change??")).toBe("climate change");
  });

  it("handles empty or whitespace-only input gracefully", () => {
    expect(sanitizeInput("   ")).toBe("");
  });
});
