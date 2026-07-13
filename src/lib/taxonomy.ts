import type { Company } from "@/lib/schemas";

export const activeVersion1Subsectors = [
  { slug: "expert-data-platforms", name: "Expert data platforms" },
  { slug: "rl-environment-providers", name: "RL environment providers" },
  { slug: "evaluation-platforms", name: "Evaluation platforms" },
  { slug: "specialized-data-providers", name: "Specialized data providers" },
] as const satisfies readonly { slug: string; name: Company["subsector"] }[];

export function getActiveSubsector(name: Company["subsector"]) {
  return activeVersion1Subsectors.find((subsector) => subsector.name === name);
}

export function countRepresentedSubsectors(companies: readonly Pick<Company, "subsector">[]) {
  return new Set(companies.map((company) => company.subsector)).size;
}
