import React, { useEffect } from "react";

const Booking = () =>{
    useEffect(() =>{
        sessionStorage.setItem('source', '');
    });

    return(
        <>
        <h4 > Booking list <br/>
        <h5> Shows the suggesting of cleaning type and </h5>Check it late! </h4>
        </>
    );
}

export default Booking