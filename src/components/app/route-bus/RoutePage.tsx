import { Card } from "@/components/ui/card";
import { Header } from "@/components/shared/Header";
import { Stepper } from "@/components/shared/Stepper";
import { RouteSelection } from "./route/RouteSelection";
import { BusSelection } from "./bus/BusSelection";
import { useAppSelector } from "@/hooks/reduxHooks";
import MovingBus from "@/assets/movingbus.gif";

export function RoutePage() {
const {isBooking} = useAppSelector((s) => s.trip);

  console.log("isBooking", isBooking)
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Main body */}
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
          {/* Showup logo + description */}
          <Header />
          {/* Route selection */}

            <div className={`p-4 mt-[-100px] z-0 text-left ${isBooking ? 'block' : 'hidden'}`}>
              <img src={MovingBus} alt="Loading" className="w-[300px] z-0 mx-auto mb-4" />
              <p className="text-sm z-10 mt-[-100px] py-3 text-center text-muted-foreground">
                Booking your trip, please wait...
              </p>
            </div>

            <div className={` flex-col gap-2" ${isBooking ? 'hidden' : 'flex'}`}>
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
