interface InfoBoxProps {
  title: string;
  content: string;
}

export default function InfoBox({ title, content }: InfoBoxProps) {
  if (!content?.trim()) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-700">
        {title}
      </h3>
      <p className="mt-3 text-slate-600 leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}
