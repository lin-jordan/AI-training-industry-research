import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { educationalModuleRecords } from "../../src/content/modules";
import { companyRecords } from "../../src/data/companies";
import { glossaryRecords } from "../../src/data/glossary";
import { activeVersion1Subsectors, countRepresentedSubsectors } from "../../src/lib/taxonomy";

const routes = [
  "/",
  "/foundations",
  "/foundations/model-lifecycle",
  "/glossary",
  "/glossary/data-annotation",
  "/companies",
  "/companies/mercor",
  "/companies/afterquery",
  "/companies/fleet",
  "/ecosystem",
  "/dashboard",
  "/news",
  "/search",
];

test("all primary routes render without horizontal overflow", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.ok(), `${route} should load`).toBeTruthy();
    await expect(page.locator("main h1")).toBeVisible();
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(hasOverflow, `${route} should not overflow horizontally`).toBeFalsy();
  }
});

test("home renders without a framework overlay or console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.locator("body")).not.toBeEmpty();
  await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("glossary search filters and shows its empty state", async ({ page }) => {
  await page.goto("/glossary");
  const search = page.getByRole("searchbox", { name: "Search the glossary" });
  await search.fill("REWARD");
  await expect(page.getByText("Reward model", { exact: true })).toBeVisible();
  await search.fill("concept-that-does-not-exist");
  await expect(page.getByRole("heading", { name: "Try a broader concept." })).toBeVisible();
});

test("Data annotation has a complete glossary route", async ({ page }) => {
  await page.goto("/glossary");
  await page.getByRole("searchbox", { name: "Search the glossary" }).fill("Data annotation");
  await page.getByRole("link", { name: "Data annotation", exact: true }).click();
  await expect(page).toHaveURL(/\/glossary\/data-annotation$/);
  await expect(page.getByRole("heading", { level: 1, name: "Data annotation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What it means" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Role in the system" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "In practice" })).toBeVisible();
});

test("coverage counts are derived from repository data", async ({ page }) => {
  const representedSubsectors = countRepresentedSubsectors(companyRecords);

  await page.goto("/");
  await expect(page.getByText(`${companyRecords.length} / 10 planned`, { exact: true })).toBeVisible();
  await expect(page.getByText(`${glossaryRecords.length} core terms`, { exact: true })).toBeVisible();
  await expect(page.getByText(`${educationalModuleRecords.length} foundation`, { exact: true })).toBeVisible();

  await page.goto("/glossary");
  await expect(page.getByRole("searchbox", { name: "Search the glossary" })).toHaveAttribute("placeholder", `Search ${glossaryRecords.length} terms`);

  await page.goto("/ecosystem");
  await expect(page.getByText(
    `${companyRecords.length} companies · ${representedSubsectors} of ${activeVersion1Subsectors.length} active subsectors represented`,
    { exact: true },
  )).toBeVisible();
  for (const subsector of activeVersion1Subsectors) {
    await expect(page.locator(`#cluster-${subsector.slug}`)).toHaveText(subsector.name);
  }

  await page.goto("/dashboard");
  await expect(page.getByText(
    `${representedSubsectors} of ${activeVersion1Subsectors.length} active subsectors represented`,
    { exact: true },
  )).toBeVisible();
});

test("site search spans content types and category filters", async ({ page }) => {
  await page.goto("/search");
  const search = page.getByRole("searchbox", { name: "Search across the atlas" });
  await search.fill("environment");
  await expect(page.getByRole("link", { name: "Fleet", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Glossary" }).click();
  await expect(page.getByRole("link", { name: "Agent environment" })).toBeVisible();
});

test("ecosystem nodes link to company profiles", async ({ page }) => {
  await page.goto("/ecosystem");
  await page.locator(".ecosystem-nodes").getByRole("link", { name: /Fleet/ }).click();
  await expect(page).toHaveURL(/\/companies\/fleet$/);
  await expect(page.getByRole("heading", { level: 1, name: "Fleet" })).toBeVisible();
});

test("representative pages have no serious accessibility violations", async ({ page }) => {
  for (const route of ["/", "/glossary", "/companies/mercor", "/dashboard", "/search"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
    expect(serious, `${route}: ${serious.map((violation) => violation.id).join(", ")}`).toEqual([]);
  }
});
