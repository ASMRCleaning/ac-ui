import { getToken } from "./authenticate";

// Retrieve residence information from a user logged in 
export async function getResidence() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence`, {
        method: "GET",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; } 
        else if(res.status === 500 || res.status === 404 ) {return null; }
    else { throw new Error(data.message); }
} 

// Retrieve residence information from customerId
export async function getResidenceByCustomerId(customerId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence/customer/${customerId}`, {
        method: "GET",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; } 
        else if(res.status === 500 || res.status === 404 ) {return null; }
    else { throw new Error(data.message); }
} 

// Change residence information from existing residence
export async function updateResidence(residenceInfo) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence`, {
        method: "PUT",
        body: JSON.stringify({
            houseType: residenceInfo.houseType,
            size: parseInt(residenceInfo.size),
            empty: residenceInfo.empty,
            furnished: residenceInfo.furnished,
            pet: residenceInfo.pet,
            bedroom: parseInt(residenceInfo.bedroom),
            bathroom: parseInt(residenceInfo.bathroom),
            den: parseInt(residenceInfo.den),
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
    
    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

// Remove residence information from existing residence id
export async function removeResidence() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence`, {
        method: "DELETE",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; }
    else { return [] }
}

//Add a new residence from a user logged in, by customer
export async function registerResidence(residenceInfo) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence`, {
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

//Add a new residence for a customer
export async function registerResidenceByCustomerId(residenceInfo, customerId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence/customer/${customerId}`, {
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
        return data;
    } else {
        throw new Error(data.message);
    }
}

// Change residence information from existing residence
export async function updateResidenceByResidenceId(residenceInfo, residenceId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/residence/${residenceId}`, {
        method: "PUT",
        body: JSON.stringify({
            houseType: residenceInfo.houseType,
            size: parseInt(residenceInfo.size),
            empty: residenceInfo.empty,
            furnished: residenceInfo.furnished,
            pet: residenceInfo.pet,
            bedroom: parseInt(residenceInfo.bedroom),
            bathroom: parseInt(residenceInfo.bathroom),
            den: parseInt(residenceInfo.den),
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
    
    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
};

// Remove residence information from existing residence id
export async function removeResidenceByResidenceId(residenceId) {
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

