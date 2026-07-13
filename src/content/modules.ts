import type { EducationalModule } from "@/lib/schemas";

export const educationalModuleRecords = [
  {
    slug: "model-lifecycle",
    title: "From pretraining to inference",
    summary: "A practical map of how general model capability becomes useful behavior—and how evaluation closes the loop.",
    order: 1,
    glossaryTerms: ["pretraining", "post-training", "supervised-fine-tuning", "evaluation", "inference"],
    relatedCompanies: ["mercor", "afterquery", "fleet"],
    sections: [
      {
        type: "paragraph",
        heading: "One lifecycle, several distinct jobs",
        body: "Modern model development is not a single training run. Pretraining builds broad capability; post-training shapes behavior; evaluation measures what changed; and inference exposes the model to real users and workflows.",
      },
      {
        type: "stage",
        name: "01 · Pretraining",
        summary: "Learn broad statistical patterns from large, diverse datasets.",
        inputs: ["Text, code, images, audio, and other corpora", "Compute and model architecture"],
        outputs: ["A general-purpose base model", "Broad representations and capabilities"],
      },
      {
        type: "stage",
        name: "02 · Post-training",
        summary: "Turn general capability into useful, steerable behavior.",
        inputs: ["Expert demonstrations", "Preference data", "Tasks, rubrics, and environments"],
        outputs: ["Instruction-following behavior", "Domain and agent capabilities"],
      },
      {
        type: "stage",
        name: "03 · Evaluation",
        summary: "Measure capability, reliability, and failure modes before and after changes.",
        inputs: ["Benchmarks", "Human review", "Automated graders and real-world tests"],
        outputs: ["Scores and qualitative findings", "Prioritized weaknesses for the next training cycle"],
      },
      {
        type: "stage",
        name: "04 · Inference",
        summary: "Run the trained model on new inputs in products and workflows.",
        inputs: ["User requests", "Tools and retrieved context", "Production constraints"],
        outputs: ["Answers and actions", "Operational feedback and new evaluation cases"],
      },
      {
        type: "callout",
        title: "The loop matters more than the line",
        body: "Evaluation and production feedback often reveal what data, tasks, or environments should be created next. The lifecycle therefore behaves like a feedback loop rather than a one-way assembly line.",
      },
      {
        type: "details",
        title: "Where do data companies fit?",
        body: "Companies in this landscape recruit experts, generate or curate datasets, design tasks and rubrics, build agent environments, and evaluate model outputs. A single provider may participate in several stages, so subsectors describe a primary emphasis—not a hard boundary.",
      },
    ],
    sourceIds: [],
    lastReviewed: "2026-07-12",
  },
] satisfies EducationalModule[];
