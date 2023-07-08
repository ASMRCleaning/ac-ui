import React, { useEffect } from "react";

const Result = () =>{
    useEffect(() =>{
        sessionStorage.setItem('source', '');
    });

    return(
        <>
        <h4 >We're working on that! <br/>
        <h5> Shows the suggesting of cleaning type and </h5>Check it late! </h4>
        </>
    );
}

export default Result