"use client"

import "./styles.scss";

import { CSpinner } from "@coreui/react";



export const Loading = (props) => {
           
    return(
        <div className="wrap-loading">
            <div className="wrap-loading-btn">
                <CSpinner variant="grow" color="primary" />
            </div>
        </div>
    )
}