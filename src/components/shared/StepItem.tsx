import { Check } from "lucide-react";
interface StepItemProps {
  step: number | string;
  stepLabel: string;
  state: string;
  path: string;
}
export function StepItem({ step, stepLabel, state, path }: StepItemProps) {
  const stateClass =
    state !== "incomplete"
      ? "bg-emerald-100"
      : "border border-2 bg-white border-gray-200";

  return (
    <li>
      <a className="flex flex-col md:flex-row items-center gap-2 md:gap-4" href={path}>
        <div
          className={`flex  items-center justify-center w-8 h-8 rounded-full ${stateClass}`}
        >
          <span className="text-black font-medium text-sm">
            {state === "complete" ? <Check size="16" /> : step}
          </span>
        </div>
        <span className="hidden md:inline-block font-semibold text-center text-[12px] md:text-left md:text-sm text-gray-900">{stepLabel}</span>
      </a>
    </li>
  );
}
