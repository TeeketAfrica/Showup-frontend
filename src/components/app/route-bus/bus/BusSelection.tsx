"use client"

import { useEffect, useMemo, useState } from "react"
import { RadioGroup } from "@/components/ui/radio-group"
import { BusOption } from "./BusOption"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { setSelecteddBus } from "@/store/features/busSlice"
import { bookTrip, initiatePayment } from "@/store/actions/tripActions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

export function flattenTrip(trip: any) {
  const { bus, route, ...rest } = trip

  return {
    ...rest,
    bus_id: bus?.id,
    driver_first_name: bus?.driver.first_name,
    driver_last_name: bus?.driver.last_name,
    color: bus?.color,
    bus_name: bus?.name,
    capacity: bus?.capacity,
    plate_number: bus?.plate_number,
    route_id: route?.id,
    source: route?.source,
    destination: route?.destination,
    time_slot: route?.time_slot,
  }
}

export function BusSelection() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedBusId, setSelectedBusId] = useState("")
  const [bookingId, setBookingId] = useState("")
  const [gateway, setGateway] = useState("paystack")
  const [paymentLoading, setPaymentLoading] = useState(false)

  const {
    trip: { selectedUniqueRouteId, trips },
    auth: { user },
  } = useAppSelector((s) => s)

  // 🔹 Flatten only once
  const flattenedTrips = useMemo(
    () => trips?.map(flattenTrip) || [],
    [trips]
  )

  // 🔹 Filter buses for selected route
  const tripBuses = useMemo(
    () =>
      flattenedTrips.filter(
        (t) => t.route_id === selectedUniqueRouteId
      ),
    [flattenedTrips, selectedUniqueRouteId]
  )

  // 🔹 Sync selected bus to Redux
  useEffect(() => {
    if (!selectedBusId) return
    const selected = trips?.find((t) => t.bus?.id === selectedBusId)
    localStorage.setItem('selectedbus', JSON.stringify(selected?.bus))
    dispatch(setSelecteddBus(selected?.bus || null))
  }, [selectedBusId, trips, dispatch])

  const handleBookTrip = async () => {
    if (!selectedBusId || !user?.id) return

    const trip = trips?.find((t) => t.bus?.id === selectedBusId)
    if (!trip) return

    try {
    const res = await dispatch(
      bookTrip({
        trip_id: trip.id,
        user_id: user.id,
        seats_booked: 1,
      })
    ).unwrap()
    
    setBookingId(res.id)

    // setOpen(true)      
    } catch (error) {
      console.log("Booking error:", error)
      return
    }


  }

  const handleSubmitPayment = async() => {

  // const handleSubmitPayment = async(e: React.FormEvent) => {
  //   e.preventDefault()
    if (!bookingId || !gateway) return;

    const params = {
      user_id: user?.id || "",
      booking_id: bookingId || "",
      payment_gateway: gateway,
      callback_url: window.location.origin + "/payment"
    }

    try {
      setPaymentLoading(true)
      const res = await(dispatch(initiatePayment(params))).unwrap()
      window.location.href = res.authorization_url;
    } catch (error) {
      console.log("Payment error:", error)
    } finally {
      setPaymentLoading(false)
    }
  }

  useEffect(()=>{
    if(bookingId){
      handleSubmitPayment()
      setBookingId('')
    }
  },[bookingId])

  return (
    <div className="bg-gray-50 rounded-xl p-4 text-left">
      <h2 className="text-sm font-semibold mb-4">Bus selection</h2>

      {selectedUniqueRouteId ? (
        <>
          <RadioGroup
            value={selectedBusId}
            onValueChange={(value) => {
              if (typeof value === "string") {
                setSelectedBusId(value)
              }
            }}
            className="flex flex-col gap-2"
          >
            {tripBuses.map((bus) => (
              <BusOption
                key={bus.id}
                id={bus.id}
                value={bus.bus_id || ""}
                busType={bus.bus_name || ""}
                seatLeft={bus.capacity}
                price={parseInt(bus.price || "0")}
                driver_first_name={bus.driver_first_name || ""}
                driver_last_name={bus.driver_last_name || ""}
                plate_number={bus.plate_number || ""}
                color={bus.color || ""}
                isActive={selectedBusId === bus.bus_id}
              />
            ))}
          </RadioGroup>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button onClick={()=>navigate('/')} variant="outline">Back</Button>
            <Button
              onClick={handleBookTrip}
              disabled={!selectedBusId || !user?.id || !selectedUniqueRouteId}
            >
              Proceed to pay
            </Button>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Please select a route to see available buses.
        </p>
      )}

      {/* 🔹 Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmitPayment}>
            <DialogHeader>
              <DialogTitle>Select Payment Gateway</DialogTitle>
              <DialogDescription>
                Choose your preferred gateway.
              </DialogDescription>
            </DialogHeader>

            <Select value={gateway} 
            onValueChange={(value) => {
                if (typeof value === "string") {
                  setGateway(value)
                }
              }}
            >
              <SelectTrigger className="w-full mt-4">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gateways</SelectLabel>
                  {/* <SelectItem value="flutterwave">Flutterwave</SelectItem> */}
                  <SelectItem value="paystack">Paystack</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <DialogFooter className="mt-6 ">
              <div className="flex gap-3 items-center w-full">
                <Button variant="outline">Cancel</Button>

                <Button type="submit" disabled={!gateway || paymentLoading}>
                  {paymentLoading ? "Processing..." : "Continue"}
                </Button>                
              </div>


            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
