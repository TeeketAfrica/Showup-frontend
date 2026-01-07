import { StepItem } from "./StepItem";
export function Stepper() {
  return (
    <div className="max-w-3xl py-10">
      <nav aria-label="Progress" className="w-full">
        <ol className="flex items-center gap-4">
          {/* Step 1 — Active */}
          <StepItem step="1" stepLabel="Pesonal details" state="current" path="/" />

          {/* separator */}
          <div className="min-w-18 h-0.5 bg-gray-300 flex-1"></div>

          {/* Step 2 — Upcoming */}
          <StepItem step="2" stepLabel="Route selection" state="incomplete" path="/route" />

          {/* separator */}
          <div className="min-w-18 h-0.5 bg-gray-300 flex-1"></div>

          {/* Step 3 — Upcoming */}
          <StepItem step="3" stepLabel="Payment" state="incomplete" path="/payment" />
        </ol>
      </nav>
    </div>
  );
}
