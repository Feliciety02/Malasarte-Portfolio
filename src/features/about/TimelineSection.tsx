import type { TimelineItem } from "@/data/about";

export function TimelineSection({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l border-white/10">
      {items.map((item, i) => (
        <div key={i} className="relative pb-8 pl-8 last:pb-0">
          <div className="absolute left-0 top-[5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />
          <div className="flex gap-4">
            {item.logo && (
              <div className="mt-1 flex shrink-0 items-start">
                <img src={item.logo} alt="" className="h-20 w-20 object-contain lg:h-28 lg:w-28" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="font-mono text-sm uppercase tracking-widest text-primary">
                {item.period}
              </span>
              <h3 className="mt-1 font-display text-lg font-bold">{item.title}</h3>
              <p className="text-base text-muted-foreground">{item.subtitle}</p>
              {item.desc && (
                <p className="mt-2 text-base leading-relaxed text-muted-foreground/80">
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
