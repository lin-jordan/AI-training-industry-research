import type { Source } from "@/lib/schemas";
import { StatusBadge } from "@/components/status-badge";

type SourceListProps = {
  sources: Source[];
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <ol className="source-list">
      {sources.map((source, index) => (
        <li key={source.id} id={`source-${source.id}`}>
          <span id={`source-${index + 1}`} className="source-list__legacy-anchor" aria-hidden="true" />
          <span className="source-list__number">[{index + 1}]</span>
          <div className="source-list__body">
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${source.title} (opens in a new tab)`}
            >
              {source.title} <span aria-hidden="true">↗</span>
            </a>
            <dl className="source-list__metadata">
              <div><dt>Publisher</dt><dd>{source.publisher}</dd></div>
              <div><dt>Published</dt><dd>{source.publicationDate ?? "Date not available"}</dd></div>
              <div><dt>Reviewed</dt><dd>{source.reviewedDate}</dd></div>
              <div><dt>Source type</dt><dd>{source.sourceType}</dd></div>
            </dl>
            <p className="source-list__claims-label">Supported claims</p>
            <ul className="source-list__claims">
              {source.supportedClaims.map((claim) => <li key={claim}>{claim}</li>)}
            </ul>
          </div>
          <div className="source-list__status">
            <span>Evidence status</span>
            <StatusBadge tone={source.evidenceLabel === "Reported" ? "amber" : "blue"}>{source.evidenceLabel}</StatusBadge>
          </div>
        </li>
      ))}
    </ol>
  );
}
