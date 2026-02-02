import axios from "../../core/axios";

export default class BusService {

    static async GetBusByRoute(route_id:string) {
        const res = await axios.get(`/buses/${route_id}`);
        return res.data;
     };

}
