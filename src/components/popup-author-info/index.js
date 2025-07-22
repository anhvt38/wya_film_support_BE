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
import { AuthorInfoPopup } from "../author-info-popup";
import { ensureHttps } from "@/utils/common";


export default function PopupAuthorInfo(props) {
    const { avatar, endPublisher, isChild = false } = props || {};

    const avatarRef = useRef();

    const onHoverPopupAuthor = (hover) => {
        if (avatarRef.current) {
            if (hover) {
                avatarRef.current.style.transform = `translateZ(10px) translateX(${isChild ? "20px" : "13px"}) translateY(-18px) scale(${isChild ? "2.5" : "1.5"})`
                avatarRef.current.style.zIndex = 200;
            } else {
                avatarRef.current.style.transform = `none`;
                avatarRef.current.style.zIndex = 50;
            }
        }

    }

    return (
        <div >
            <Image
                ref={avatarRef}
                alt='avatar'
                src={avatar ? ensureHttps(avatar) : "/logon.png"}
                width={isChild ? 30 : 50}
                height={isChild ? 30 : 50}
                className="rounded-circle objectfit-cover author-avatar cursor-pointer"
                onMouseMove={() => onHoverPopupAuthor(true)}
                onMouseLeave={() => onHoverPopupAuthor(false)}

            />
            <div className="wrap-author-info"
                onMouseMove={() => onHoverPopupAuthor(true)}
                onMouseLeave={() => onHoverPopupAuthor(false)}
            >
                <AuthorInfoPopup publisher={endPublisher} />
            </div>
        </div>
    );
}