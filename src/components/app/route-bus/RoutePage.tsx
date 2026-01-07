import { Card } from "@/components/ui/card";
import { Header } from "@/components/shared/Header";
import { Stepper } from "@/components/shared/Stepper";
import { RouteSelection } from "./route/RouteSelection";
import { BusSelection } from "./bus/BusSelection";
import { BusEmpty } from "./bus/BusEmpty";

export function RoutePage() {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          {/* Showup logo + description */}
          <Header />
          {/* Route selection */}
          <div className="flex flex-col gap-2">
            <RouteSelection />
            {/* Bus selection */}
            <BusSelection />
            {/* empty state */}
            <BusEmpty />
          </div>
        </Card>
      </div>

      {/* Stepper UI to move between steps*/}
      <Stepper />
    </div>
  );
}
