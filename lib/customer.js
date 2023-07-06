import { getToken } from "./authenticate";

// Retrieve customer information from a user logged in  
export async function getCustomerInfo() {
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

// Update customer information from a user logged in  
// export async function updateCustomerInfo(customerInfo, password, password2) {
//     console.log(customerInfo.firstName, customerInfo.lastName, password, password2)
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer`, {
//         method: "PUT",
//         body: JSON.stringify({
//             aaaaa: customerInfo.firstName,
//             lastName: customerInfo.lastName,
//         }),
//         headers: {
//             "Authorization": `jwt ${getToken()}`
//         }
//     });

//     const data = await res.json();
    
//     if (res.status === 200) { // Print each property of the data object
//         for (const key in data) {
//             if (Object.hasOwnProperty.call(data, key)) {
//                 console.log(key, data[key]);
//             }
//         }
//         return data; }

//     else { throw new Error(data.message); }
// }

export async function updateCustomerInfo(customerInfo, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer`, {
        method: "PUT",
        body: JSON.stringify({
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            password: password,
            password2: password2
        }),

        headers: {
            "Authorization": `jwt ${getToken()}`,
            "content-type": "application/json",
        },
    });

    const data = await res.json();
    console.log(res.status);

    if (res.status === 200) { return data; } 
    else { throw new Error(data.message); }
}
