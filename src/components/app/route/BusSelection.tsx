import { RadioGroup } from "@/components/ui/radio-group";
import { BusOption } from "./BusOption";
import { Button } from "@/components/ui/button";

export function BusSelection() {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-left">
      {/* Body heading */}
      <div className="flex flex-col mb-4">
        <h2 className="text-sm font-semibold text-card-foreground">
          Bus selection
        </h2>
      </div>
      {/* Bus selection list */}
      <div className="flex flex-col gap-2">
        <RadioGroup>
          <BusOption
            id="bus1"
            value="bus1"
            busType="8 seater bus"
            seatLeft={5}
          />
          <BusOption
            id="bus2"
            value="bus2"
            busType="12 seater bus"
            seatLeft={8}
          />
        </RadioGroup>
      </div>

      {/* Button */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full">
        <Button variant="outline" size="lg" className="w-full cursor-pointer">
          Back
        </Button>
        <Button size="lg" className="w-full cursor-pointer">
          Proceed to pay
        </Button>
      </div>
    </div>
  );
}
