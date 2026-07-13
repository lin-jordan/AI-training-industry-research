const stages = [
  { number: "01", name: "Pretraining", copy: "Build a base model from broad data and predictive objectives." },
  { number: "02", name: "Post-training", copy: "Shape behavior with demonstrations, preferences, outcomes, and practice." },
  { number: "03", name: "Evaluation", copy: "Measure capabilities, trade-offs, and failures under defined conditions." },
  { number: "04", name: "Inference & operation", copy: "Run the model in products or agent systems with tools and environments." },
] as const;

export function LifecycleFlow() {
  return (
    <figure className="lifecycle-figure" aria-label="Model-development lifecycle and feedback loop">
      <ol className="lifecycle-flow">
        {stages.map((stage) => (
          <li key={stage.number}>
            <span className="lifecycle-flow__number">{stage.number}</span>
            <h3>{stage.name}</h3>
            <p>{stage.copy}</p>
          </li>
        ))}
      </ol>
      <figcaption>Text equivalent: pretraining builds the base model; post-training shapes behavior; evaluation measures results; and inference or agent operation applies the system. Evidence from evaluation and operation feeds new data, tasks, training, and tests, so these stages can overlap and repeat.</figcaption>
    </figure>
  );
}
