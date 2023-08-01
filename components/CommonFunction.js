import { format } from "date-fns"; // date format

export const formatBookingDate = (bookingDate) => {
    const date = new Date(bookingDate);
    return format(date, "dd.MM.yyyy");
};

export const capitalizeFirstLetter = (str) => {
    return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};


export function formatDateToISO(inputDate) {
    // Split the input date string by '.' to extract day, month, and year
    const [day, month, year] = inputDate.split('.');

    // Create a Date object using the extracted values (Note: Months in JavaScript Date start from 0, so we subtract 1 from the month)
    const dateObject = new Date(`${year}-${month}-${day}`);

    // Convert the Date object to ISO format
    const formattedDate = dateObject.toISOString();
    return formattedDate;
}

export const disableCapitalizeFirstLetter = (str) => {
    return str.split(" ").map((word) => word.charAt(0).toLowerCase() + word.slice(1)).join(" ");
};