import { getToken } from "./authenticate";
import { formatDateToISO } from "../components/CommonFunction";

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
    const startDate = formatDateToISO(bookingInfo.startDate);
    const endDate = formatDateToISO(bookingInfo.endDate);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingInfo._id}`, {
        method: "PUT",
        body: JSON.stringify({
            employeeId: bookingInfo.employeeId,
            status: bookingInfo.status,
            serviceType: bookingInfo.serviceType,
            frequency: bookingInfo.frequency,
            startDate:startDate,
            endDate: endDate,
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