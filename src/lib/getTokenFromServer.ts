import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () => {
    const retriveToken = await auth.api.getToken({
        headers: await headers()
    })
    const token = retriveToken?.token
    if (!token) {
        throw new Error("Unable to get an authentication token. Please sign in again.")
    }
    return token
}
