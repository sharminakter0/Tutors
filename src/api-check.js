import axios from "axios";
import { envVars } from "./config";

export async function getSavedTutors(token) {
    const res = await axios.get(
        `${envVars.backend_origin}/savedtutor`,
        {
            headers: {
                Authorization: `Bearer ${token}`, // Attach Firebase token
            },
        }
    );
    return res;
}