import type { EducationalModule } from "@/lib/schemas";

type ModuleContentProps = {
  module: EducationalModule;
};

export function ModuleContent({ module }: ModuleContentProps) {
  return (
    <div className="module-content">
      {module.sections.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "paragraph") {
          return (
            <section className="module-prose" key={key}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              <p>{block.body}</p>
            </section>
          );
        }

        if (block.type === "callout") {
          return (
            <aside className="module-callout" key={key}>
              <p className="eyebrow">Key idea</p>
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </aside>
          );
        }

        if (block.type === "details") {
          return (
            <details className="module-details" key={key}>
              <summary>{block.title}</summary>
              <p>{block.body}</p>
            </details>
          );
        }

        return (
          <section className="module-stage" key={key}>
            <div className="module-stage__heading">
              <p className="eyebrow">Lifecycle stage</p>
              <h2>{block.name}</h2>
              <p>{block.summary}</p>
            </div>
            <div className="module-stage__io">
              <div>
                <h3>Typical inputs</h3>
                <ul>{block.inputs.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>Typical outputs</h3>
                <ul>{block.outputs.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
