import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/content",
  fullyParallel: true,
  retries: 0,
  reporter: "list",
});
