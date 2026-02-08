import { Card } from "@/components/ui/card";
import { RouteSelection } from "./route/RouteSelection";
import { BusSelection } from "./bus/BusSelection";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import MovingBus from "@/assets/movingbus.gif";
import BasicLayout from "@/components/Layout.tsx/BasicLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkExistingUser } from "@/store/features/authSlice";

export function RoutePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    trip: { isBooking, isPaying },
    auth: { user, checked },
  } = useAppSelector((s) => s);


    // 1️⃣ Hydrate auth on mount
  useEffect(() => {
    dispatch(checkExistingUser());
  }, [dispatch]);

  // 2️⃣ Redirect if not logged in
  useEffect(() => {
    if (checked && !user) {
      navigate("/", { replace: true });
    }
  }, [checked, user, navigate]);
  
  return (
    <BasicLayout>
      <Card className="max-w-sm shadow-none border-0 ring-0 focus-visible:ring-0 focus:ring-0">
        
        {(isBooking || isPaying) && (
          <div className="p-4 -mt-24 text-left">
            <img src={MovingBus} alt="Loading" className="w-72 mx-auto mb-4" />
            <p className="text-sm -mt-24 py-3 text-center text-muted-foreground">
              {isBooking
                ? "Booking your trip, please wait..."
                : "Initiating payment, please wait..."}
            </p>
          </div>
        )}

        {!(isBooking || isPaying) && (
          <div className="flex flex-col gap-2">
            <RouteSelection />
            <BusSelection />
          </div>
        )}

      </Card>
    </BasicLayout>
  );
}
