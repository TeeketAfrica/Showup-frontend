
export function Stepper() {
  return (
    <div className="max-w-3xl py-10">
      <nav aria-label="Progress" className="w-full">
        <ol className="flex items-center gap-4">
          {/* Step 1 — Active */}
          <li className="flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
              <span className="text-black font-medium text-sm">1</span>
            </div>
            <span className="font-semibold text-sm text-gray-900">
              Personal details
            </span>
          </li>

          {/* separator */}
          <div className="min-w-[72px] h-0.5 bg-gray-300 flex-1"></div>

          {/* Step 2 — Upcoming */}
          <li className="flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-2 bg-white border-gray-200">
              <span className="text-gray-700 text-sm">2</span>
            </div>
            <span className="text-gray-700 text-sm font-medium">
              Route selection
            </span>
          </li>

          {/* separator */}
          <div className="min-w-[72px] h-0.5 bg-gray-300 flex-1"></div>

          {/* Step 3 — Upcoming */}
          <li className="flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white border-gray-200">
              <span className="text-gray-700 text-sm">3</span>
            </div>
            <span className="text-gray-700 text-sm font-medium">Payment</span>
          </li>
        </ol>
      </nav>
    </div>
  );
}
