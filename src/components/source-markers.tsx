import type { Source } from "@/lib/schemas";

type SourceMarkersProps = {
  sourceIds?: string[];
  sources: Source[];
};

export function SourceMarkers({ sourceIds = [], sources }: SourceMarkersProps) {
  const citations = sourceIds.flatMap((sourceId) => {
    const sourceIndex = sources.findIndex((source) => source.id === sourceId);
    return sourceIndex === -1 ? [] : [{ source: sources[sourceIndex], number: sourceIndex + 1 }];
  });

  if (citations.length === 0) return null;

  return (
    <sup className="source-markers">
      <span aria-hidden="true">[</span>
      {citations.map(({ source, number }, index) => (
        <span key={source.id}>
          {index > 0 ? <span aria-hidden="true">, </span> : null}
          <a
            href={`#source-${source.id}`}
            aria-label={`Source ${number}: ${source.title}`}
          >
            {number}
          </a>
        </span>
      ))}
      <span aria-hidden="true">]</span>
    </sup>
  );
}
