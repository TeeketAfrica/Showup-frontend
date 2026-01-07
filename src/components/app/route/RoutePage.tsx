import { Card } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Header } from "@/components/shared/Header";
import { Stepper } from "@/components/shared/Stepper";
import { RouteOption } from "./RouteOption";
import { BusOption } from "./BusOption";
import { Button } from "@/components/ui/button";

export function RoutePage() {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          {/* Showup logo + description */}
          <Header />

          {/* Route selection */}
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

          {/* Bus selection */}
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
              <Button
                variant="outline"
                size="lg"
                className="w-full cursor-pointer"
              >
                Back
              </Button>
              <Button size="lg" className="w-full cursor-pointer">
                Proceed to pay
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Stepper UI to move between steps*/}
      <Stepper />
    </div>
  );
}
