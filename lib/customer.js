import { getToken } from "./authenticate";

// Retrieve residence information from a user logged in 
export async function getCustomerInfo(userName) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/${userName}`,{
        method: "GET",
        headers:{
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();
    console.log(data)
    if(res.status === 200){ 
        return data;
    }
    else {
        throw new Error(data.message);
      }
}