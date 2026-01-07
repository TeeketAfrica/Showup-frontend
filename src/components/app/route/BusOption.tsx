import { Bus } from "lucide-react";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface BusOptionProps {
  id: string;
  value: string;
  busType: string;
  seatLeft: number;
}

export function BusOption({ id, value, busType, seatLeft }: BusOptionProps) {
  return (
    <div className="flex gap-4 p-3 bg-white rounded-md hover:ring-1 hover:ring-gray-100 items-center">
      {/* Trip details */}
      <div className="flex flex-col grow">
        {/* icon + trip name */}
        <div className="flex items-center gap-1">
          <Bus size="16" className="text-amber-500" />
          <p className="text-sm font-semibold">
            {busType}
          </p>
        </div>

        {/* Trip start time */}
        <p className="text-muted-foreground font-normal">
          Seats remaining: <span className="text-black">{seatLeft}</span>
        </p>
      </div>
      {/* Radio selector */}
      <div>
        <RadioGroupItem value={value} id={id} />
      </div>
    </div>
  );
}
