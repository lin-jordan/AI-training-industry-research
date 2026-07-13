type StatusBadgeProps = {
  children: string;
  tone?: "blue" | "amber" | "neutral";
};

export function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${tone}`}>{children}</span>;
}
