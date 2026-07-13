import type { Source } from "@/lib/schemas";
import { StatusBadge } from "@/components/status-badge";

type SourceListProps = {
  sources: Source[];
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <ol className="source-list">
      {sources.map((source, index) => (
        <li key={source.id} id={`source-${index + 1}`}>
          <span className="source-list__number">[{index + 1}]</span>
          <div>
            <a href={source.url} target="_blank" rel="noreferrer">{source.title} <span aria-hidden="true">↗</span></a>
            <p>{source.publisher} · Reviewed {source.reviewedDate}</p>
          </div>
          <StatusBadge tone={source.evidenceLabel === "Reported" ? "amber" : "blue"}>{source.evidenceLabel}</StatusBadge>
        </li>
      ))}
    </ol>
  );
}
