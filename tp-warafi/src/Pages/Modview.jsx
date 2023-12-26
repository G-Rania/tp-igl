import React from "react";
import Modbarre from "../Components/Usersview/Modbarre";
import Article from "../Components/Usersview/Article";

const Modview = () => {
    return(
        <div className="flex flex-row justify-start">
            <Modbarre></Modbarre>
            <Article/>
        </div>
    )
}
export default Modview