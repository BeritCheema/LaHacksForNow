type SectionProps = {
  title: string;
  subtitle?: string;
  children: any;
};

export function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="section-block">
      <h2>{title}</h2>
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
      <div className="section-content">{children}</div>
    </section>
  );
}
