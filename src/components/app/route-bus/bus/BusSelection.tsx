import { useMemo, useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { BusOption } from "./BusOption";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setSelecteddBus } from "@/store/features/busSlice";
import { bookTrip, initiatePayment } from "@/store/actions/tripActions";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { BusEmpty } from "./BusEmpty";

export function flattenTrip(trip: any) {
  const { bus, route, ...rest } = trip;

  return {
    ...rest,
    bus_id: bus?.id,
    driver_first_name: bus?.driver?.first_name,
    driver_last_name: bus?.driver?.last_name,
    color: bus?.color,
    bus_name: bus?.name,
    capacity: bus?.capacity,
    plate_number: bus?.plate_number,
    route_id: route?.id,
    source: route?.source,
    destination: route?.destination,
    time_slot: route?.time_slot,
  };
}

export function BusSelection() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedBusId, setSelectedBusId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    trip: { selectedUniqueRouteId, trips },
    auth: { user },
  } = useAppSelector((s) => s);

  const flattenedTrips = useMemo(
    () => trips?.map(flattenTrip) || [],
    [trips]
  );

  const tripBuses = useMemo(
    () =>
      flattenedTrips.filter(
        (t) =>
          t.route_id === selectedUniqueRouteId &&
          t.available_seats > 0
      ),
    [flattenedTrips, selectedUniqueRouteId]
  );

  const handleSelectBus = (value: string) => {
    setSelectedBusId(value);

    const selected = trips?.find((t) => String(t.bus?.id) === value);
    if (selected?.bus) {
      localStorage.setItem("selectedBus", JSON.stringify(selected.bus));
      dispatch(setSelecteddBus(selected.bus));
    }
  };

  const handleProceedToPay = async () => {
    if (!selectedBusId || !user?.id) return;

    const trip = trips?.find(
      (t) => String(t.bus?.id) === selectedBusId
    );
    if (!trip) return;

    try {
      setLoading(true);

      // 1️⃣ Book Trip
      const booking = await dispatch(
        bookTrip({
          trip_id: trip.id,
          user_id: user.id,
          seats_booked: 1,
        })
      ).unwrap();

      // 2️⃣ Initiate Payment
      const payment = await dispatch(
        initiatePayment({
          user_id: user.id,
          booking_id: booking.id,
          payment_gateway: "paystack",
          callback_url: window.location.origin + "/payment",
        })
      ).unwrap();

      // 3️⃣ Redirect to gateway
      window.location.href = payment.authorization_url;
    } catch (error) {
      console.log("Booking/Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {tripBuses.length > 0 ? (
        <div className="bg-gray-50 rounded-xl p-4 text-left">
          <h2 className="text-sm font-semibold mb-4">Bus selection</h2>

          {selectedUniqueRouteId ? (
            <>
              <RadioGroup
                value={selectedBusId}
                onValueChange={(value) =>
                  typeof value === "string" && handleSelectBus(value)
                }
                className="flex flex-col gap-2"
              >
                {tripBuses.map((bus) => (
                  <BusOption
                    key={bus.id}
                    id={bus.id}
                    value={String(bus.bus_id)}
                    busType={bus.bus_name || ""}
                    seatLeft={bus.available_seats}
                    totalSeat={bus.capacity}
                    price={parseInt(bus.price || "0")}
                    driver_first_name={bus.driver_first_name || ""}
                    driver_last_name={bus.driver_last_name || ""}
                    plate_number={bus.plate_number || ""}
                    color={bus.color || ""}
                    isActive={selectedBusId === String(bus.bus_id)}
                  />
                ))}
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button onClick={() => navigate("/")} variant="outline">
                  Back
                </Button>
                <Button
                  onClick={handleProceedToPay}
                  disabled={!selectedBusId || !user?.id || loading}
                >
                  {loading ? "Processing..." : "Proceed to Pay"}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Please select a route to see available buses.
            </p>
          )}
        </div>
      ) : (
        <div className="px-2">
          {selectedUniqueRouteId ? (
            <BusEmpty
              phone={user?.mobile as string}
              userId={user?.id as string}
              routeId={selectedUniqueRouteId}
            />
          ) : (
            <Link to="/">
              <Button>
                <ChevronLeftIcon /> Back
              </Button>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
