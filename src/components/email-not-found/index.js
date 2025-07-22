import { CButton, CFormCheck, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import "./styles.scss";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import SliderVerify from "../slider-verify";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import ScratchBackground from "../scratch-background";


export default function EmailNotFound(props) {
    const { onToForgotPassword } = props || {};




    return (
        <div className="email-not-found">
             <CButton className="fs-6" onClick={onToForgotPassword}>确定</CButton>
        </div>
    );
}