import { getToken } from "./authenticate";


// Retrieve all booking information
export async function getAllBooking() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/all`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
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
        // throw new Error(data.message);
        return null;
    }
}

// Retrieve booking information by employeeId
export async function getBookingByEmployee(employeeId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/employee/${employeeId}`, {
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
        // throw new Error(data.message);
        return null;
    }
}

// Change booking information from existing booking
export async function updateBookingById(bookingInfo) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingInfo.bookingId}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}?visitId=${visitId}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking?visitId=${visitId}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/customer/${bookingInfo.customerId}`, {
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

// Create a new booking using data from user logged in, by customer
export async function registerBookingByCustomer(bookingInfo) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `jwt ${getToken()}`
        }
    });

    const data = await res.json();

    if (res.status === 200) { return data; }
    else { return [] }
}