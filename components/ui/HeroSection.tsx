interface HeroSectionProps {
  title: string;
  subtitle?: string;
  supportingLine?: string;
}

export default function HeroSection({ title, subtitle, supportingLine }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-blue-100 sm:text-xl">
            {subtitle}
          </p>
        )}
        {supportingLine && (
          <p className="mt-3 text-sm text-blue-200/90">
            {supportingLine}
          </p>
        )}
      </div>
    </section>
  );
}
