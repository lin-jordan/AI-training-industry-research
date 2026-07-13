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
        id: "lifecycle-overview",
        type: "paragraph",
        heading: "One lifecycle, several distinct jobs",
        body: "Modern model development is not a single training run. Pretraining builds broad capability; post-training shapes behavior; evaluation measures what changed; and inference exposes the model to real users and workflows.",
      },
      {
        id: "pretraining",
        type: "stage",
        name: "01 · Pretraining",
        summary: "Pretraining uses large, varied datasets and a predictive objective—such as predicting the next token in a sequence—to build reusable representations and broad capabilities. The resulting base model can transfer to many tasks, but pretraining alone does not guarantee reliable instruction following, factuality, safety, or task-specific performance. Post-training shapes that behavior, while evaluation tests what the model can do and where it fails.",
        inputs: [
          "Large collections of text, code, images, audio, or other modalities",
          "A predictive objective, such as next-token prediction",
          "A model architecture and optimization process",
        ],
        outputs: [
          "A base model with broad learned representations and capabilities",
          "A starting point for post-training and evaluation—not a finished assistant or agent",
        ],
        sourceIds: ["gpt3-few-shot-learners", "foundation-models-report"],
      },
      {
        id: "post-training",
        type: "stage",
        name: "02 · Post-training",
        summary: "Turn general capability into useful, steerable behavior.",
        inputs: ["Expert demonstrations", "Preference data", "Tasks, rubrics, and environments"],
        outputs: ["Instruction-following behavior", "Domain and agent capabilities"],
      },
      {
        id: "evaluation",
        type: "stage",
        name: "03 · Evaluation",
        summary: "Measure capability, reliability, and failure modes before and after changes.",
        inputs: ["Benchmarks", "Human review", "Automated graders and real-world tests"],
        outputs: ["Scores and qualitative findings", "Prioritized weaknesses for the next training cycle"],
      },
      {
        id: "inference",
        type: "stage",
        name: "04 · Inference",
        summary: "Run the trained model on new inputs in products and workflows.",
        inputs: ["User requests", "Tools and retrieved context", "Production constraints"],
        outputs: ["Answers and actions", "Operational feedback and new evaluation cases"],
      },
      {
        id: "feedback-loop",
        type: "callout",
        title: "The loop matters more than the line",
        body: "Evaluation and production feedback often reveal what data, tasks, or environments should be created next. The lifecycle therefore behaves like a feedback loop rather than a one-way assembly line.",
      },
      {
        id: "company-roles",
        type: "details",
        title: "Where do data companies fit?",
        body: "Companies in this landscape recruit experts, generate or curate datasets, design tasks and rubrics, build agent environments, and evaluate model outputs. A single provider may participate in several stages, so subsectors describe a primary emphasis—not a hard boundary.",
      },
    ],
    sourceIds: ["gpt3-few-shot-learners", "foundation-models-report"],
    lastReviewed: "2026-07-13",
  },
] satisfies EducationalModule[];
