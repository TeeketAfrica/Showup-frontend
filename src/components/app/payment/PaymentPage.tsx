import { Card } from "@/components/ui/card";
import { Header } from "@/components/shared/Header";
import { Stepper } from "@/components/shared/Stepper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import successIcon from "@/assets/successIcon.svg";
import { Bus, Clock } from "lucide-react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { formatTo12HourTime } from "@/lib/utils";
import {
  clearSelectedUniqueRouteId,
  type Trip,
} from "@/store/features/tripSlice";
import { clearSelectedBus } from "@/store/features/busSlice";
import type { BusProps } from "@/lib/types";
import { useNavigate } from "react-router-dom";

export function PaymentPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState<Trip | null>(null);
  const [busData, setBusData] = useState<BusProps | null>(null);

  useEffect(() => {
    try {
      const trip = localStorage.getItem("selectedTrip");
      const bus = localStorage.getItem("selectedBus");

      if (trip) setTripData(JSON.parse(trip));
      if (bus) setBusData(JSON.parse(bus));

      localStorage.setItem("confirmPayment", "true");
    } catch (error) {
      console.error("Storage parse error:", error);
    }
  }, []);

  const handleRetake = () => {
    dispatch(clearSelectedBus());
    dispatch(clearSelectedUniqueRouteId());
    localStorage.removeItem('selectedBus')
    localStorage.removeItem('selectedTrip')
    navigate("/route");
  };
  const handleClear = () => {
    dispatch(clearSelectedBus());
    dispatch(clearSelectedUniqueRouteId());
    localStorage.clear()
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="container flex-1 flex flex-col justify-center items-center">
        <Card className="max-w-sm shadow-none border-0 ring-0">
          <Header noDescription />

          <div className="bg-gray-50 rounded-xl p-4 text-left">
            <div className="flex flex-col gap-2 text-center mb-4">
              <img
                src={successIcon}
                alt="Success Icon"
                className="w-16 h-16 mx-auto"
              />
              <h4 className="text-sm font-semibold">Your ride is confirmed</h4>
              <p className="text-sm text-muted-foreground">
                Your payment is confirmed, and your ride is booked! Please arrive
                15 minutes early.
              </p>
            </div>

            {/* Ride details */}
            <div className="flex flex-col gap-2 p-3 bg-white rounded-md mb-4">
              <div className="flex items-center">
                <div className="flex items-center gap-1 grow">
                  <Bus size={16} className="text-amber-500" />
                  <p className="text-sm font-semibold">{busData?.name}</p>
                </div>

                {tripData?.start_time && (
                  <Badge
                    variant="secondary"
                    className="rounded-sm text-purple-800 bg-purple-100 pl-1"
                  >
                    <Clock size={12} strokeWidth={3} />
                    Leaves at {formatTo12HourTime(tripData.start_time)}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-3 items-center p-2 rounded-sm bg-gray-100">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground">Plate number</p>
                  <p className="text-xs font-medium">{busData?.plate_number}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground">Vehicle color</p>
                  <p className="text-xs font-medium">{busData?.color || 'Unspecified'}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="text-xs font-medium">
                    {busData?.driver?.first_name} {busData?.driver?.last_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Button onClick={handleRetake} size="lg" className="w-full">
                Book Another Trip
              </Button>              
              <Button onClick={handleClear} variant={'outline'} size="lg" className="w-full">
                Logout
              </Button>              
            </div>

          </div>
        </Card>
      </div>

      <Stepper />
    </div>
  );
}
