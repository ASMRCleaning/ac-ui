import { getToken } from "./authenticate";

// Retrieve customer information from a user logged in  
export async function getUserInfo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer`, {
        method: "GET",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    }
    else {
        throw new Error(data.message);
    }
}