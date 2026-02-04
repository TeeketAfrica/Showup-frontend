// services/auth.service.ts
import axios from "../../core/axios";

export interface RegisterUserPayload {
    mobile: string;
    first_name: string;
    last_name: string;
    email: string;
}

export default class AuthService {
    static async CheckUser(mobile: string) {
        const res = await axios.post("/users/check-mobile", { mobile });
        return res.data;
     };
     
    static async RegisterUser(payload: RegisterUserPayload) {
        const res = await axios.post("/users", payload);
        return res.data;
     };

}
