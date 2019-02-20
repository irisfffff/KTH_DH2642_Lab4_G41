import React from "react";
import "./Loader.css";

function Loader(props){
    return <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>;
}

export default Loader;