import { getToken } from "./authenticate";

// Retrieve residence information from a user logged in 
export async function getResidence() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/residence`, {
        method: "GET",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; }
    else { return [] }
}

// Change residence information from existing residence id  houseType, size, empty, furnished, pet, bedrooms, bath, dens, frequency, address, unit, postalCode, city, province
export async function updateResidence(residenceInfo) {
    console.log(residenceInfo);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/residence`, {
        method: "PUT",
        body: JSON.stringify({
            houseType: residenceInfo.houseType,
            size: residenceInfo.size,
            empty: residenceInfo.empty,
            furnished: residenceInfo.furnished,
            pet: residenceInfo.pet,
            bedrooms: residenceInfo.bedrooms,
            bath: residenceInfo.bath,
            dens: residenceInfo.dens,
            frequency: residenceInfo.frequency,
            address: {
                streetAddress: residenceInfo.address?.streetAddress,
                unit: residenceInfo.address?.unit,
                postalCode: residenceInfo.address?.postalCode,
                city: residenceInfo.address?.city,
                province: residenceInfo.address?.province,
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
export async function removeResidence() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/residence`, {
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
export async function registerResidence(residenceInfo) {
    console.log(residenceInfo);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/residence`, {
        method: "POST",
        body: JSON.stringify({
            houseType: residenceInfo.houseType,
            size: parseInt(residenceInfo.size),
            empty: residenceInfo.empty,
            furnished: residenceInfo.furnished,
            pet: residenceInfo.pet,
            bedroom: parseInt(residenceInfo.bedroom),
            bathroom: parseInt(residenceInfo.bathroom),
            den: parseInt(residenceInfo.den),
            frequency: residenceInfo.frequency,
            address: {
                streetAddress: residenceInfo.address?.streetAddress,
                unit: residenceInfo.address?.unit,
                postalCode: residenceInfo.address?.postalCode,
                city: residenceInfo.address?.city,
                province: residenceInfo.address?.province,
                country: "CA",
            },
        }),

        headers: {
            "Authorization": `jwt ${getToken()}`,
            "content-type": "application/json",
        },
    });

    const data = await res.json();
    
    if (res.status === 201) {
        return true;
    } else {
        throw new Error(data.message);
    }
}
