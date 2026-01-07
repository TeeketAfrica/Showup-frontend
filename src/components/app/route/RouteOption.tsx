import { Map } from "lucide-react";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface RouteOptionProps {
  id: string;
  value: string;
  from: string;
  to: string;
  time: string;
}

export function RouteOption({ id, value, from, to, time }: RouteOptionProps) {
  return (
    <div className="flex gap-4 p-3 bg-white rounded-md hover:ring-1 hover:ring-gray-100 items-center">
      {/* Trip details */}
      <div className="flex flex-col grow">
        {/* icon + trip name */}
        <div className="flex items-center gap-1">
          <Map size="16" className="text-blue-500" />
          <p className="text-sm font-semibold">
            {from} <span className="text-muted-foreground"> to </span> {to}
          </p>
        </div>

        {/* Trip start time */}
        <p className="text-muted-foreground font-normal">
          Trip starts at <span className="text-black">{time}</span>
        </p>
      </div>
      {/* Radio selector */}
      <div>
        <RadioGroupItem value={value} id={id} />
      </div>
    </div>
  );
}
