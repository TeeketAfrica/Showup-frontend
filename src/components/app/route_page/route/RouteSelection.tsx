import { RadioGroup } from "@/components/ui/radio-group";
import { RouteOption } from "./RouteOption";

export function RouteSelection() {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-left">
      {/* Body heading */}
      <div className="flex flex-col mb-4">
        <h2 className="text-sm font-semibold text-card-foreground">
          Route selection
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose your route first and then select the bus to take next.
        </p>
      </div>

      {/* Route selection */}
      <div className="flex flex-col gap-2">
        <RadioGroup>
          <RouteOption
            id="route1"
            value="route1"
            from="Yaba"
            to="Victoria Island"
            time="5:00 AM."
          />
          <RouteOption
            id="route2"
            value="route2"
            from="Lekki"
            to="Ikoyi"
            time="6:00 AM."
          />
        </RadioGroup>
      </div>
    </div>
  );
}
