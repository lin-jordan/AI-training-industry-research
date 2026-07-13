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

test("flagship module body is searchable as one foundations result", async ({ page }) => {
  await page.goto("/search");
  const search = page.getByRole("searchbox", { name: "Search across the atlas" });
  const moduleTitle = educationalModuleRecords[0].title;

  for (const query of ["RLVR", "trajectory", "computer use", "evaluation", "agent environment"]) {
    await search.fill(query);
    await expect(page.getByRole("link", { name: moduleTitle, exact: true })).toBeVisible();
    await expect(page.locator(".search-results").getByRole("link", { name: moduleTitle, exact: true })).toHaveCount(1);
  }
});

test("ecosystem nodes link to company profiles", async ({ page }) => {
  await page.goto("/ecosystem");
  await page.locator(".ecosystem-nodes").getByRole("link", { name: /Fleet/ }).click();
  await expect(page).toHaveURL(/\/companies\/fleet$/);
  await expect(page.getByRole("heading", { level: 1, name: "Fleet" })).toBeVisible();
});

test("flagship lifecycle renders its full outline and derived navigation", async ({ page }) => {
  const moduleRecord = educationalModuleRecords[0];
  await page.goto("/foundations/model-lifecycle");

  await expect(page.getByRole("heading", { level: 1, name: "From pretraining to agents: how the AI model-development lifecycle fits together" })).toBeVisible();

  const moduleRail = page.getByRole("navigation", { name: "Module navigation" });
  await expect(moduleRail.locator("a")).toHaveCount(moduleRecord.sections.length);
  expect(await moduleRail.locator("a").evaluateAll((links) => (
    links.map((link) => link.getAttribute("href"))
  ))).toEqual(moduleRecord.sections.map((block) => `#${block.id}`));

  for (const blockId of [
    "learning-objective",
    "system-map",
    "pretraining",
    "post-training",
    "evaluation",
    "inference-and-agents",
    "worked-example",
    "industry-fit",
    "feedback-loop",
    "evaluation-limitations",
    "training-signal-limitations",
    "continue-exploring",
  ]) {
    await expect(page.locator(`#${blockId}`), `${blockId} should render`).toBeVisible();
  }

  await expect(page.getByRole("figure", { name: "Model-development lifecycle and feedback loop" })).toBeVisible();
  await expect(page.locator("#worked-example")).toContainText("illustrative synthesis");
  await expect(page.locator("#worked-example")).toContainText("software-research agent");
});

test("flagship lifecycle citations and disclosures work without client scripting", async ({ page }) => {
  await page.goto("/foundations/model-lifecycle");

  const pretraining = page.locator("#pretraining");
  await expect(pretraining.getByRole("heading", { name: "01 · Pretraining builds a base model" })).toBeVisible();
  await expect(pretraining).toContainText("next token");
  await expect(pretraining).toContainText("does not guarantee reliable instruction following");

  const citationLinks = pretraining.locator(".source-markers a");
  await expect(citationLinks).toHaveCount(2);
  await expect(citationLinks.first()).toHaveAttribute("href", "#source-gpt3-few-shot-learners");
  await expect(citationLinks.first()).toHaveAccessibleName("Source 1: Language Models are Few-Shot Learners");
  await citationLinks.first().click();
  await expect(page).toHaveURL(/#source-gpt3-few-shot-learners$/);

  const sourceRow = page.locator("#source-gpt3-few-shot-learners");
  await expect(sourceRow).toBeVisible();
  await expect(sourceRow).toContainText("OpenAI");
  await expect(sourceRow).toContainText("2020-05-28");
  await expect(sourceRow).toContainText("primary");
  await expect(sourceRow).toContainText("Inferred");
  await expect(sourceRow).toContainText("Supported claims");

  await expect(page.locator("#post-training .source-markers a").first()).toHaveAttribute("href", "#source-instructgpt-human-feedback");
  await expect(page.locator("#evaluation .source-markers a")).toHaveCount(3);
  await expect(page.locator("#inference-and-agents .source-markers a").last()).toHaveAttribute("href", "#source-webarena-agent-environment");

  const evaluationLimits = page.locator("#evaluation-limitations");
  const summary = evaluationLimits.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(evaluationLimits).toHaveAttribute("open", "");
  await expect(evaluationLimits).toContainText("Benchmark contamination");
});

test("flagship lifecycle links to companies and active ecosystem categories", async ({ page }) => {
  await page.goto("/foundations/model-lifecycle");

  const categoryLinks = page.getByRole("navigation", { name: "Active Version 1 ecosystem categories" });
  for (const subsector of activeVersion1Subsectors) {
    await expect(categoryLinks.getByRole("link", { name: subsector.name })).toHaveAttribute(
      "href",
      `/ecosystem#cluster-${subsector.slug}`,
    );
  }

  const continueExploring = page.locator("#continue-exploring").locator("xpath=following-sibling::*[1]");
  for (const company of companyRecords) {
    await expect(continueExploring.getByRole("link", { name: company.name, exact: true })).toHaveAttribute(
      "href",
      `/companies/${company.slug}`,
    );
  }
  await expect(continueExploring.getByRole("link", { name: "Explore the ecosystem map" })).toHaveAttribute("href", "/ecosystem");
  await expect(continueExploring.getByRole("link", { name: "Review the module bibliography" })).toHaveAttribute("href", "#module-sources-heading");
});

test("representative pages have no serious accessibility violations", async ({ page }) => {
  for (const route of ["/", "/foundations/model-lifecycle", "/glossary", "/companies/mercor", "/dashboard", "/search"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
    expect(serious, `${route}: ${serious.map((violation) => violation.id).join(", ")}`).toEqual([]);
  }
});
