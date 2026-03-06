import { FadeIn, ViewIn } from "../animations/motion-components";

export function SectionHeader({
  title,
  tag,
  description,
}: {
  title: { span: string; rest: string };
  tag: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <FadeIn
        direction="right"
        delay={0}
        className="flex items-center gap-2 mb-4 justify-center"
      >
        <span className="h-px w-8 bg-primary rounded-full" />
        <span className="text-primary text-xs font-black uppercase tracking-[0.3em]">
          {tag}
        </span>
      </FadeIn>

      <ViewIn
        initial={{ opacity: 0, y: 20 }}
        view={{ opacity: 1, y: 0 }}
        delay={0.1}
      >
        <h2 className="text-2xl md:text-5xl font-black tracking-tight text-secondary dark:text-white">
          {title.span} <span className="text-primary">{title.rest}</span>
        </h2>
      </ViewIn>

      <ViewIn
        initial={{ opacity: 0, y: 20 }}
        view={{ opacity: 1, y: 0 }}
        delay={0.2}
      >
        <p className="mt-6 text-lg text-gray-500 dark:text-muted-foreground leading-relaxed">
          {description}
        </p>
      </ViewIn>
    </div>
  );
}
