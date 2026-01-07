import { Bus } from "lucide-react";
import { RadioCard } from "@/components/shared/RadioCard";

interface BusOptionProps {
  id: string;
  value: string;
  busType: string;
  seatLeft: number;
  disabled?: boolean;
}

export function BusOption({
  id,
  value,
  busType,
  seatLeft,
  disabled,
}: BusOptionProps) {
  return (
    <RadioCard id={id} value={value} disabled={disabled}>
      {/* icon + trip name */}
      <div className="flex items-center gap-1">
        <Bus
          size="16"
          className={disabled ? "text-muted-foreground" : "text-amber-500"}
        />
        <p className="text-sm font-semibold">{busType}</p>
      </div>

      {/* Trip start time */}
      <p className="text-muted-foreground font-normal">
        Seats remaining: <span className="text-black">{seatLeft}</span>
      </p>
    </RadioCard>
  );
}
