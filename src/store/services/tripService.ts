import axios from "../../core/axios";

export interface TripBookingProps  {
    trip_id: string;
    user_id: string;
    seats_booked: number;
}

export interface TripPaymentProps  {
    user_id: string;
    booking_id: string;
    payment_gateway: string;
    callback_url: string;
}
export interface NotifyMeProps  {
    user_id: string;
    route_id: string;
}

export default class TripService {
    static async GetTrips() {
        const res = await axios.get("/trips");
        return res.data;
     };
    static async GetTripPrice(route_id: string, busId: string) {
        const res = await axios.get(`/trips/${route_id}/price?bus_id=${busId}`);
        return res.data;
     };
    static async BookTrip(data: TripBookingProps) {
        const res = await axios.post("/trips/book", data);
        return res.data;
     };
    static async InitiatePayment(data: TripPaymentProps) {
        const res = await axios.post("/payments/initialize", data);
        return res.data;
     };
    static async NotifyMe(data: NotifyMeProps) {
        const res = await axios.post("/trips/notify", data);
        return res.data;
     };

    
     


}
