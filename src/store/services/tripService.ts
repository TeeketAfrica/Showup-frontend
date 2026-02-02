import axios from "../../core/axios";

export default class TripService {
    static async GetTrips() {
        const res = await axios.get("/trips/");
        return res.data;
     };
    static async GetTripPrice(route_id: string, busId: string) {
        const res = await axios.get(`/trips/${route_id}/price?bus_id=${busId}`);
        return res.data;
     };
    static async BookTrip(mobile: string) {
        const res = await axios.post("/users/check-mobile");
        return res.data;
     };
     


}
