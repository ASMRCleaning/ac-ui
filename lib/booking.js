import { getToken } from "./authenticate";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

// Retrieve all booking information
export async function getAllBooking() {
    const res = await fetch(`${apiUrl}/booking/all`, {
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

// Retrieve booking information by bookingId
export async function getBookingById(bookingId) {
    const res = await fetch(`${apiUrl}/booking/${bookingId}`, {
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

// Retrieve booking information by customerId
export async function getBookingByCustomer() {
    const res = await fetch(`${apiUrl}/booking`, {
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

// Retrieve booking information by employeeId
export async function getBookingByEmployee(employeeId) {
    const res = await fetch(`${apiUrl}/booking/employee/${employeeId}`, {
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

// Change booking information from existing booking
export async function updateBookingById(bookingInfo) {
    const res = await fetch(`${apiUrl}/booking/${bookingInfo.bookingId}`, {
        method: "PUT",
        body: JSON.stringify({
            employeeId: bookingInfo.employeeId,
            serviceType: bookingInfo.serviceType,
            frequency: bookingInfo.frequency,
            startDate: bookingInfo.startDate,
            endDate: bookingInfo.endDate,
            specification:bookingInfo.specification,
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

// Change visit service information from existing booking
export async function updateVisitServiceByBookingId(bookingId, visitId, status) {
    const res = await fetch(`${apiUrl}/booking/${bookingId}?visitId=${visitId}`, {
        method: "PUT",
        body: JSON.stringify({
            status: status,
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

// Change visit service information from existing booking by customerId
export async function updateVisitService(visitId, status) {
    const res = await fetch(`${apiUrl}/booking?visitId=${visitId}`, {
        method: "PUT",
        body: JSON.stringify({
            status: status,
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

// Create a new booking to customerId
export async function registerBooking(bookingInfo) {
    const res = await fetch(`${apiUrl}/booking/customer/${bookingInfo.customerId}`, {
        method: "POST",
        body: JSON.stringify({
            employeeId: bookingInfo.employeeId,
            residenceId: bookingInfo.residenceId,
            serviceType: bookingInfo.serviceType,
            frequency: bookingInfo.frequency,
            startDate: bookingInfo.startDate,
            endDate: bookingInfo.endDate,
            specification: bookingInfo.specification,
            status: bookingInfo.status,
        }),
        headers: {
            "Authorization": `jwt ${getToken()}`,
            "content-type": "application/json",
        },
    });

    const data = await res.json();
    
    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}

// Create a new booking using data from user logged in, by customer
export async function registerBookingByCustomer(bookingInfo) {
    const res = await fetch(`${apiUrl}/booking`, {
        method: "POST",
        body: JSON.stringify({
            employeeId: bookingInfo.employeeId,
            residenceId: bookingInfo.residenceId,
            serviceType: bookingInfo.serviceType,
            frequency: bookingInfo.frequency,
            startDate: bookingInfo.startDate,
            endDate: bookingInfo.endDate,
            specification: bookingInfo.specification,
            status: bookingInfo.status,
            frequency: bookingInfo.frequency,
        }),
        headers: {
            "Authorization": `jwt ${getToken()}`,
            "content-type": "application/json",
        },
    });

    const data = await res.json();
    
    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}

// Remove booking information from existing booking id
export async function removeBooking(bookingId) {
    const res = await fetch(`${apiUrl}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; }
    else {  throw new Error(data.message); }
}