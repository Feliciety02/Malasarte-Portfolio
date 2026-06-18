export function ScreenFallbackCards({
  modules,
}: {
  modules: { title: string; desc: string }[];
}) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {modules.map((module, index) => (
        <article key={`${module.title}-${index}`} className="metal-card h-full p-6">
          <span className="font-mono text-xs text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold text-white/92">
            {module.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{module.desc}</p>
        </article>
      ))}
    </div>
  );
}
