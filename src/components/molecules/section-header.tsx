export function SectionHeader({
  title,
  tag,
  description,
  action,
}: {
  title: { span: string; rest: string };
  tag: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between pb-4 border-b border-border mb-10">
      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary block mb-2">
          {tag}
        </span>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">
          {title.span} {title.rest}
        </h2>
        {description && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="hidden md:block">{action}</div>}
    </div>
  );
}
