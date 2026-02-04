import { RadioGroupItem } from "@/components/ui/radio-group";
import { type ReactNode } from "react";

interface RadioCardProps {
  id: string;
  value: string;
  children: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}

export function RadioCard({
  id,
  value,
  children,
  isActive = false,
  disabled = false,
}: RadioCardProps) {
  return (
    <label
      htmlFor={id}
      className={`relative flex gap-4 p-3 bg-white rounded-md transition-all cursor-pointer border ${
        isActive
          ? "border-gray-400"
          : "border-transparent hover:ring-1 hover:ring-gray-200"
      } ${disabled ? "bg-gray-100 opacity-75 cursor-not-allowed" : ""}`}
    >
      {/* Content area */}
      <div className="flex flex-col grow">{children}</div>
      {/* Radio selector */}
      <div className="absolute top-3 right-3">
        <RadioGroupItem value={value} id={id} disabled={disabled} />
      </div>
    </label>
  );
}
