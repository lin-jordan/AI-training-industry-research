import { SourceMarkers } from "@/components/source-markers";
import type { EducationalModule, Source } from "@/lib/schemas";

type ModuleContentProps = {
  module: EducationalModule;
  sources: Source[];
};

export function ModuleContent({ module, sources }: ModuleContentProps) {
  return (
    <div className="module-content">
      {module.sections.map((block) => {
        if (block.type === "paragraph") {
          return (
            <section className="module-prose" id={block.id} key={block.id}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              <p>{block.body}<SourceMarkers sourceIds={block.sourceIds} sources={sources} /></p>
            </section>
          );
        }

        if (block.type === "callout") {
          return (
            <aside className="module-callout" id={block.id} key={block.id}>
              <p className="eyebrow">Key idea</p>
              <h2>{block.title}</h2>
              <p>{block.body}<SourceMarkers sourceIds={block.sourceIds} sources={sources} /></p>
            </aside>
          );
        }

        if (block.type === "details") {
          return (
            <details className="module-details" id={block.id} key={block.id}>
              <summary>{block.title}</summary>
              <p>{block.body}<SourceMarkers sourceIds={block.sourceIds} sources={sources} /></p>
            </details>
          );
        }

        return (
          <section className="module-stage" id={block.id} key={block.id}>
            <div className="module-stage__heading">
              <p className="eyebrow">Lifecycle stage</p>
              <h2>{block.name}</h2>
              <p>{block.summary}<SourceMarkers sourceIds={block.sourceIds} sources={sources} /></p>
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
