import React from 'react';

import { Link } from "@reach/router";


export default (props) => {
    const { page, url1, text1, url2, text2 } = props;


    return (
        <div name="navBar" className="text-left row mb-4 mt-3">
            <Link className="h4 mr-2 pr-3 border-right" 
            style = {page==="page1" ? {fontWeight: "bold", borderBottom: "2px solid black"} : {}}
            to={url1}>{text1}</Link>
            <Link className="h4 ml-2" 
            style = {page==="page2" ? {fontWeight: "bold", borderBottom: "2px solid black"} : {}}
            to={url2}>{text2}</Link>
        </div>
    )
}