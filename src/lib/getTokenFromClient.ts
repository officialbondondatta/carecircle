import { toast } from "sonner";
import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
    const { data, error } = await authClient.token()
    if (error) {
        toast.error(
            error instanceof Error ?
                error?.message : "Something went wrong"
        )
    }
    const token = data?.token
    return token
}