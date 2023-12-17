import React from "react";
import Section1 from "../Components/LandingPage/Section1";
import Section2 from "../Components/LandingPage/Section2";
import Section3 from "../Components/LandingPage/Section3";
import Section4 from "../Components/LandingPage/Section4";


const LandingPage = () => {
    return(
        <div className="bg-none">
            <Section1/>
            <div className='bg-none' style={{ padding: "80px" }}></div>
            <Section2/>
            <div className='bg-none' style={{ padding: "52px" }}></div>
            <Section3/>
            <div className='bg-none' style={{ padding: "52px" }}></div>
            <Section4/>
            <div className='bg-none' style={{ padding: "80px" }}></div>

        </div>
    )
}

export default LandingPage