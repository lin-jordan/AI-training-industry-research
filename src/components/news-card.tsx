import type { NewsItem } from "@/lib/schemas";
import { StatusBadge } from "@/components/status-badge";

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="news-card" id={item.id}>
      <div className="news-card__meta">
        <time dateTime={item.date}>{item.dateLabel}</time>
        <StatusBadge tone={item.sourceType === "official" ? "blue" : "amber"}>{item.sourceType}</StatusBadge>
      </div>
      <p className="eyebrow">{item.category} · {item.companyOrTopic}</p>
      <h2>{item.headline}</h2>
      <p>{item.summary}</p>
      <div className="news-card__takeaway">
        <strong>Why it matters</strong>
        <p>{item.takeaway}</p>
      </div>
      <a className="text-link" href={item.url} target="_blank" rel="noreferrer">
        Read at {item.publisher} <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
