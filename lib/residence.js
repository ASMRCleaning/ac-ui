import { getToken } from "./authenticate";

// Retrieve residence information from a user logged in 
export async function getResidence(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; }
    else { return [] }
}

// Change residence information from existing residence id
export async function changeResidence(userId, houseType, size, empty, furnished, pet, bedrooms, bath, dens, frequency, address, unit, postalCode, city, province) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
            houseType: houseType,
            size: size,
            empty: empty,
            furnished: furnished,
            pet: pet,
            bedrooms: bedrooms,
            bath: bath,
            dens: dens,
            frequency: frequency,
            address: {
                address: address,
                unit: unit,
                postalCode: postalCode,
                city: city,
                province: province,
                country: "CA",
            },
        }),
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; }
    else { return [] }
}

// Remove residence information from existing residence id
export async function removeResidence(residenceId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence/${residenceId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; }
    else { return [] }
}

//Add a new residence from a user logged in
export async function registerResidence(userId, houseType, size, empty, furnished, pet, bedrooms, bath, dens, frequency, address, unit, postalCode, city, province) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${userId}`, {
        method: "POST",
        body: JSON.stringify({
            houseType: houseType,
            size: size,
            empty: empty,
            furnished: furnished,
            pet: pet,
            bedrooms: bedrooms,
            bath: bath,
            dens: dens,
            frequency: frequency,
            address: {
                address: address,
                unit: unit,
                postalCode: postalCode,
                city: city,
                province: province,
                country: "CA",}
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
