import { Map } from "lucide-react";
import { RadioCard } from "@/components/shared/RadioCard";

interface RouteOptionProps {
  id: string;
  value: string;
  from: string;
  to: string;
  time: string;
  isActive?: boolean;
}

export function RouteOption({
  id,
  value,
  from,
  to,
  time,
  isActive,
}: RouteOptionProps) {
  return (
    <RadioCard id={id} value={value} isActive={isActive}>
      {/* icon + trip name */}
      <div className="flex items-center gap-1">
        <Map size="16" className="text-blue-500" />
        <p className="text-sm font-semibold">
          {from} <span className="text-muted-foreground">to </span> {to}
        </p>
      </div>

      {/* Trip start time */}
      <p className="text-muted-foreground font-normal">
        Trip starts at <span className="text-black">{time}</span>
      </p>
    </RadioCard>
  );
}
