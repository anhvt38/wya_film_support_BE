"use client"

import "./styles.scss";

import { CToast, CToastBody, CToastClose } from "@coreui/react";

export const Toast = (props) => {
    const { toggle, className, message } = props;

    return (
        <CToast autohide={true} onClose={toggle} visible={message} className={`custom-toast text-white align-items-center position-fixed ${className}`}>
            <div className="d-flex">
                <CToastBody>{message}</CToastBody>
                <CToastClose className="me-2 m-auto" white onClick={toggle} />
            </div>
        </CToast>
    );
}