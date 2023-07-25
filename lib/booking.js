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

// Retrieve subscription information by id
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

// Update booking information by bookingId
export async function updateBookingById(bookingInfo) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingInfo._id}`, {
        method: "PUT",
        body: JSON.stringify({
            employeeId: bookingInfo.employeeId,
            status: bookingInfo.status,
            serviceType: bookingInfo.serviceType,
            frequency: bookingInfo.frequency,
            startDate: bookingInfo.startDate,
            endDate: bookingInfo.endDate,
            specification: bookingInfo.specification,
        }),
        headers: {
            "Authorization": `jwt ${getToken()}`,
            "content-type": "application/json",
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
