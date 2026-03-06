import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PhoneCall } from "lucide-react";

const agents = ["08121981784", "08023959617", "07064901525", "08094003566"];

export function ContactAgent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="fixed p-6 text-lg cursor-pointer group border shadow-xl text-primary dark:text-white bg-card rounded-full px-8 bottom-6 right-6 z-50">
          <PhoneCall className="w-8 h-8 text-primary group-hover:text-white" />
          <span className="ml-2 group-hover:text-white">
            Talk to our agents
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-card">
        <div className="grid gap-4">
          {agents.map((agent) => (
            <div key={agent} className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium">{agent}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
