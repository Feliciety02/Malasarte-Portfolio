import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export function ShowMore({ children, label }: { children: ReactNode; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleContent>{children}</CollapsibleContent>
      <CollapsibleTrigger className="group mt-4 inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-muted-foreground/60 transition-colors hover:text-primary">
        {open ? "Show less" : label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
    </Collapsible>
  );
}
