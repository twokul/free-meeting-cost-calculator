import { describe, expect, test } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { VALID_ROLES } from "../lib/demo-data";

const BASE_URL = "https://free-meeting-cost-calculator.com";

describe("SEO", () => {
  describe("sitemap", () => {
    test("includes home page", () => {
      const entries = sitemap();
      const homeEntry = entries.find((entry) => entry.url === BASE_URL);
      expect(homeEntry).toBeDefined();
      expect(homeEntry?.priority).toBe(1);
    });

    test("includes all role pages", () => {
      const entries = sitemap();
      for (const role of VALID_ROLES) {
        const roleEntry = entries.find(
          (entry) => entry.url === `${BASE_URL}/cost/${role}`,
        );
        expect(roleEntry).toBeDefined();
        expect(roleEntry?.priority).toBe(0.8);
      }
    });

    test("does not include dashboard or api routes", () => {
      const entries = sitemap();
      const dashboardEntry = entries.find((entry) =>
        entry.url.includes("/dashboard"),
      );
      const apiEntry = entries.find((entry) => entry.url.includes("/api"));
      expect(dashboardEntry).toBeUndefined();
      expect(apiEntry).toBeUndefined();
    });
  });

  describe("robots.txt", () => {
    test("allows crawling of public pages", () => {
      const config = robots();
      expect(config.rules).toBeDefined();

      const rules = Array.isArray(config.rules)
        ? config.rules[0]
        : config.rules;
      expect(rules.allow).toBe("/");
    });

    test("disallows dashboard and api routes", () => {
      const config = robots();
      const rules = Array.isArray(config.rules)
        ? config.rules[0]
        : config.rules;

      const disallowed = Array.isArray(rules.disallow)
        ? rules.disallow
        : [rules.disallow];
      expect(disallowed).toContain("/dashboard");
      expect(disallowed).toContain("/api/");
    });

    test("includes sitemap URL", () => {
      const config = robots();
      expect(config.sitemap).toBe(`${BASE_URL}/sitemap.xml`);
    });
  });

  describe("llms.txt", () => {
    const llmsTxtPath = join(process.cwd(), "public", "llms.txt");

    test("exists", () => {
      const content = readFileSync(llmsTxtPath, "utf-8");
      expect(content.length).toBeGreaterThan(0);
    });

    test("contains site title", () => {
      const content = readFileSync(llmsTxtPath, "utf-8");
      expect(content).toContain("Free Meeting Cost Calculator");
    });

    test("contains key features", () => {
      const content = readFileSync(llmsTxtPath, "utf-8");
      expect(content).toContain("Google Calendar");
      expect(content).toContain("Role-Based");
      expect(content).toContain("Privacy");
    });

    test("contains usage instructions", () => {
      const content = readFileSync(llmsTxtPath, "utf-8");
      expect(content).toContain("How to Use");
      expect(content).toContain(BASE_URL);
    });

    test("lists available pages", () => {
      const content = readFileSync(llmsTxtPath, "utf-8");
      expect(content).toContain("/cost/[role]");
      expect(content).toContain("/dashboard");
    });
  });
});
