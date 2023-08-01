import { getToken } from "./authenticate";

// Retrieve customer information from a user logged in  
export async function getUserInfo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
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

//Retrieve user information based on a specific user id
export async function getUserById(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
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

//Retrieve user information based on a specific role
export async function getUsersByRole(userRole) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/all?role=${userRole}`, {
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

export async function updateUserInfo(userInfo) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "PUT",
        body: JSON.stringify({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            password: userInfo.password,
            password2: userInfo.password2,
            email: userInfo.email,
            phone: userInfo.phone,
        }),

        headers: {
            "Authorization": `jwt ${getToken()}`,
            "content-type": "application/json",
        },
    });

    const data = await res.json();
    if (res.status === 200) { return data; } 
    else { throw new Error(data); }
}