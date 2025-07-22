import { CButton, CFormCheck, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import "./styles.scss";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdTagFaces } from "react-icons/md";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import SliderVerify from "../slider-verify";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import ScratchBackground from "../scratch-background";


export default function IconTable(props) {
    const { } = props || {};
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const onToggleDropdown = () => {
        setIsOpen(!isOpen)
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="icon-table"  ref={dropdownRef}>
            <MdTagFaces 
            onClick={onToggleDropdown} 
            className="face-ic text-pink-hover fs-3 cursor-pointer" />
            {
                isOpen &&
                <div className="icon-table-content">
                <CTabs activeItemKey={1} defaultActiveItemKey={1}>
                    <CTabList variant="pills">
                        <CTab aria-controls="icon-tab-1" itemKey={1}>常用表情 </CTab>
                        <CTab aria-controls="icon-tab-2" itemKey={2}>多福熊 </CTab>
                        <CTab aria-controls="icon-tab-3" itemKey={3}>糊糊 </CTab>
                        <CTab aria-controls="icon-tab-4" itemKey={4}>鸡大白 </CTab>
                        <CTab aria-controls="icon-tab-5" itemKey={5}>喵魂  </CTab>
                        <CTab aria-controls="icon-tab-6" itemKey={6}>霹雳兔  </CTab>
                        <CTab aria-controls="icon-tab-7" itemKey={7}>球球  </CTab>
                        <CTab aria-controls="icon-tab-8" itemKey={8}>甜心兔   </CTab>
                        <CTab aria-controls="icon-tab-9" itemKey={9}>兔白白   </CTab>
                    </CTabList>
                    <CTabContent>
                        <CTabPanel className="p-3" aria-labelledby="icon-tab-1" itemKey={1}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="profile-tab-pane" itemKey={2}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="contact-tab-pane" itemKey={3}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={4}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={5}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={6}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={7}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={8}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={9}>
                            <div className="d-flex gap-2 flex-wrap">
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                                <Image width={40} height={40} alt=":(500" src="/avc" />
                            </div>
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </div>
            }
        </div>
    );
}