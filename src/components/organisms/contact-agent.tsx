import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PhoneCall, Phone } from "lucide-react";

const agents = [
  { number: "08124362413", display: "0812 436 2413" },
  { number: "09011215084", display: "0901 121 5084" },
  { number: "09070604655", display: "0907 060 4655" },
  { number: "09011455223", display: "0901 145 5223" },
];

export function ContactAgent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground px-5 py-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-lg cursor-pointer">
          <PhoneCall className="w-4 h-4" />
          <span className="hidden sm:inline">Talk to an Agent</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-0 border border-border bg-card shadow-xl"
        side="top"
        align="end"
        sideOffset={8}
      >
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Call an Agent
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Tap a number to dial
          </p>
        </div>
        <div className="divide-y divide-border">
          {agents.map((agent) => (
            <a
              key={agent.number}
              href={`tel:${agent.number}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group"
            >
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-sm font-mono font-medium text-foreground group-hover:text-primary transition-colors">
                {agent.display}
              </span>
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
