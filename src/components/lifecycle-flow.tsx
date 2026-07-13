const stages = [
  { number: "01", name: "Pretraining", copy: "Build broad capability from large, diverse datasets." },
  { number: "02", name: "Post-training", copy: "Shape behavior with demonstrations, feedback, and practice." },
  { number: "03", name: "Evaluation", copy: "Measure strengths, failures, and real-world task performance." },
  { number: "04", name: "Inference", copy: "Apply the trained model to new requests, tools, and workflows." },
] as const;

export function LifecycleFlow() {
  return (
    <figure className="lifecycle-figure">
      <ol className="lifecycle-flow">
        {stages.map((stage) => (
          <li key={stage.number}>
            <span className="lifecycle-flow__number">{stage.number}</span>
            <h3>{stage.name}</h3>
            <p>{stage.copy}</p>
          </li>
        ))}
      </ol>
      <figcaption>Evaluation and production feedback create a return path to new data, tasks, and training runs.</figcaption>
    </figure>
  );
}
