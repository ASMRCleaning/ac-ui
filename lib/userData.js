import { getToken } from "./authenticate";

// Retrieve user information from a user logged in 
export async function getUserInfo(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,{
        method: "GET",
        headers:{
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if(res.status === 200){ return data;}
    else { return []}
}

// Change residence information from existing residence id
export async function changeUserInfo(residenceAddressId, address, unit, postalCode, city, province) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${residenceAddressId}`,{
        method: "PUT",
        body: JSON.stringify({
            address: address,
            unit: unit,
            postalCode: postalCode,
            city: city,
            province: province,
            country: "CA",
        }),
        headers:{
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if(res.status === 200){ return data;}
    else { return []}
}

// Remove residence information from existing residence id
export async function removeResidenceAddress(residenceAddressId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${residenceAddressId}`,{
        method: "DELETE",
        headers:{
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if(res.status === 200){ return data;}
    else { return []}
}

//Add a new residence from a user logged in
export async function registerResidenceAddress(userId, address, unit, postalCode, city, province) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${userId}`, {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            address: address,
            unit: unit,
            postalCode: postalCode,
            city: city,
            province: province,
            country: "CA",
        }),

        headers: {
            "content-type": "application/json",
        },

    });

    const data = await res.json();
    console.log(data)

    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
    
}
