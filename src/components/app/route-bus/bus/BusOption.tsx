import { Bus, Tag } from "lucide-react";
import { RadioCard } from "@/components/shared/RadioCard";
import { Badge } from "@/components/ui/badge";

interface BusOptionProps {
  id: string;
  value: string;
  busType: string;
  seatLeft: number;
  price: number;
  isActive?: boolean;
  disabled?: boolean;
}

export function BusOption({
  id,
  value,
  busType,
  seatLeft,
  price,
  isActive,
  disabled,
}: BusOptionProps) {
  return (
    <RadioCard id={id} value={value} isActive={isActive} disabled={disabled}>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between w-full">
          {/* icon + trip name */}
          <div className="flex items-center gap-1">
            <Bus
              size="16"
              className={disabled ? "text-muted-foreground" : "text-amber-500"}
            />
            <p className="text-sm font-semibold">{busType}</p>
          </div>

          {/* Price Badge */}
          <Badge variant="secondary" className="text-xs -mt-1 pl-1.5">
            <Tag size="12" strokeWidth="3" />
            <span className="font-bold">₦{price.toLocaleString()}</span>
          </Badge>
        </div>

        {/* Trip start time */}
        <p className="text-muted-foreground text-xs font-normal">
          Seats remaining: <span className="text-black">{seatLeft}</span>
        </p>
      </div>
    </RadioCard>
  );
}
