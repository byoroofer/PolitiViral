type SectionHeadingProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function SectionHeading({ description, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-5">
      <span className="eyebrow-pill">{eyebrow}</span>
      <div className="space-y-4">
        <h2 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
