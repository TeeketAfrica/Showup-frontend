import { Card } from "@/components/ui/card";
import { Header } from "@/components/shared/Header";
import { Stepper } from "@/components/shared/Stepper";
import { RouteSelection } from "./route/RouteSelection";
import { BusSelection } from "./bus/BusSelection";
import { useAppSelector } from "@/hooks/reduxHooks";
import MovingBus from "@/assets/movingbus.gif";

export function RoutePage() {
const {
  trip :{isBooking, isPaying}
} = useAppSelector((s) => s);


  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          {/* Showup logo + description */}
          <Header />
          {/* Route selection */}

            <div className={`p-4 -mt-25 z-0 text-left ${isBooking || isPaying ? 'block' : 'hidden'}`}>
              <img src={MovingBus} alt="Loading" className="w-75 z-0 mx-auto mb-4" />
              <p className="text-sm z-10 -mt-25 py-3 text-center text-muted-foreground">
                {isBooking ? "Booking your trip, please wait..." : "Processing payment, please wait..."}
              </p>
            </div>

            <div className={` flex-col gap-2 ${isBooking || isPaying ? 'hidden' : 'flex'}`}>
              <RouteSelection />
              {/* Bus selection */}
              <BusSelection />
              {/* empty state */}
              {/* <BusEmpty /> */}
            </div>

        </Card>
      </div>

      {/* Stepper UI to move between steps*/}
      <Stepper />
    </div>
  );
}
