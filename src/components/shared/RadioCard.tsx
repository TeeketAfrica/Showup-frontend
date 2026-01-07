import { RadioGroupItem } from "@/components/ui/radio-group";
import { type ReactNode } from "react";

interface RadioCardProps {
  id: string;
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export function RadioCard({
  id,
  value,
  children,
  disabled = false,
}: RadioCardProps) {
  return (
    <div
      className={`flex gap-4 p-3 rounded-md hover:ring-1 hover:ring-gray-100 ${
        disabled ? "bg-gray-100 opacity-75 cursor-not-allowed" : "bg-white "
      }`}
    >
      {/* Content area */}
      <div className="flex flex-col grow">{children}</div>
      {/* Radio selector */}
      <div>
        <RadioGroupItem value={value} id={id} disabled={disabled} />
      </div>
    </div>
  );
}
