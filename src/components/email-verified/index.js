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


export default function EmailVerified(props) {
    const { onToCompleteRegister } = props || {};

    const codeRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [captchaCode, setCaptchaCode] = useState('');
    const [input, setInput] = useState('');



    return (
        <div className="email-verified">
             <CButton className="fs-6" onClick={onToCompleteRegister}>继续</CButton>
        </div>
    );
}