import React, { useEffect } from "react";

const Employee = () =>{
    useEffect(() =>{
        sessionStorage.setItem('source', '');
    });

    return(
        <>
        <h4 > Employee List <br/>
        <h5> Shows the suggesting of cleaning type and </h5>Check it late! </h4>
        </>
    );
}

export default Employee