import { describe, it, expect } from "vitest";
import { sanitizeInput } from "../sanitize";

describe("sanitizeInput", () => {
  it("should trim and lowercase text", () => {
    expect(sanitizeInput("  Hello WORLD  ")).toBe("hello world");
  });

  it("should collapse multiple spaces into one", () => {
    expect(sanitizeInput("Hello     there")).toBe("hello there");
  });

  it("should remove accents and diacritics", () => {
    expect(sanitizeInput("Café")).toBe("cafe");
    expect(sanitizeInput("Niño")).toBe("nino");
  });

  it("should remove potential HTML or script tags", () => {
    expect(sanitizeInput("<script>alert('x')</script>Test")).toBe("test");
  });

  it("should remove special characters except basic punctuation", () => {
    expect(sanitizeInput("Climate! Change??")).toBe("climate change");
  });

  it("should handle empty or whitespace-only input", () => {
    expect(sanitizeInput("   ")).toBe("");
  });
});
