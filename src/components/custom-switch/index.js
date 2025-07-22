import { CButton, CFormCheck, CFormInput, CFormSwitch, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import "./styles.scss";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import SliderVerify from "../slider-verify";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import ScratchBackground from "../scratch-background";
import IconTable from "../icon-table";
import { IoMdStats } from "react-icons/io";
import { MainContext } from "@/layouts/MainLayout";


export default function CustomSwitch(props) {
    const { label, checked, onChange } = props || {};

    return (
        <label className="custom-switch">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className="slider" />
            <span className="ms-5">{label}</span>
        </label>
    );
}