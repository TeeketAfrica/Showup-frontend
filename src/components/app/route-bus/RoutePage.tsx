import { Card } from "@/components/ui/card";
import { RouteSelection } from "./route/RouteSelection";
import { BusSelection } from "./bus/BusSelection";
import { useAppSelector } from "@/hooks/reduxHooks";
import MovingBus from "@/assets/movingbus.gif";
import BasicLayout from "@/components/Layout.tsx/BasicLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RoutePage() {
  const navigate = useNavigate()
  const {
    trip :{isBooking, isPaying},
    auth :{user}
  } = useAppSelector((s) => s);


  useEffect(()=>{
    if(!user){
      navigate('/')
    }
  },[user])
  return (
    <BasicLayout>
        <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">

          {/* Route selection */}
            <div className={`p-4 -mt-25 z-0 text-left ${isBooking || isPaying ? 'block' : 'hidden'}`}>
              <img src={MovingBus} alt="Loading" className="w-75 z-0 mx-auto mb-4" />
              <p className="text-sm z-10 -mt-25 py-3 text-center text-muted-foreground">
                {isBooking ? "Booking your trip, please wait..." : "Initiating payment, please wait..."}
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
    </BasicLayout>

  );
}
