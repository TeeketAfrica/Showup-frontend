import { useEffect, useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { RouteOption } from "./RouteOption";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getTrips } from "@/store/actions/tripActions";
import { formatTo12HourTime } from "@/lib/utils";
import { setSelectedUniqueRouteId, type Trip } from "@/store/features/tripSlice";

interface RouteInfo {
  routeId: string;
  start_time: string;
  source: string;
  destination: string;
}

export function getUniqueRoutes(trips: Trip[]): RouteInfo[] {
  const routeMap = new Map<string, RouteInfo>();

  trips.forEach((trip) => {
    const { id, source, destination } = trip.route;

    if (!routeMap.has(id)) {
      routeMap.set(id, {
        start_time: trip.start_time,
        routeId: id,
        source,
        destination,
      });
    }
  });

  return Array.from(routeMap.values());
}


export function RouteSelection() {
  const dispatch = useAppDispatch()
  const [selectedRouteId, setSelectedRouteId] = useState("");  
  const {trips} = useAppSelector((s) => s.trip)

  const uniqueTrips = getUniqueRoutes(trips || []);

  useEffect(()=>{
    if(!trips){
      dispatch(getTrips())
    }
  }, [trips])


  useEffect(() => {
    if(selectedRouteId){
      const trip = trips?.find(t => t.route.id === selectedRouteId);
      localStorage.setItem('selectedTrip', JSON.stringify(trip))
      dispatch(setSelectedUniqueRouteId(selectedRouteId))
    }
  }, [selectedRouteId]);

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

      <div className="flex flex-col gap-2">
        <RadioGroup
          value={selectedRouteId}
          onValueChange={(val) => setSelectedRouteId(val as string)}
        >
          {
            uniqueTrips?.map((trip) => (
              <RouteOption
                key={trip.routeId}
                id={trip.routeId}
                value={trip.routeId}
                from={trip.source}
                to={trip.destination}
                time={formatTo12HourTime(trip.start_time)}
                isActive={selectedRouteId === trip.routeId}
              />
            ))}
        </RadioGroup>
      </div>
    </div>
  );
}
