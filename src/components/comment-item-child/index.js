import { CButton, CFormCheck, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
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
import PopupAuthorInfo from "../popup-author-info";
import { AiFillLike } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import BoxComment from "../box-comment";
import { MainContext } from "@/layouts/MainLayout";



export default function CommentItemChild(props) {
    const { avatar = '', endPublisher = {}, item } = props || {};
    const { id, text } = item || {};

    const { setLoginNotiModal, setIsOpenAuthModal } = useContext(MainContext);

    const dropdownRef = useRef(null);
    const [isOpenBlock, setIsOpenBlock] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);

    const toggleReply = (id) => {
        setReplyingTo((prev) => (prev === id ? null : id)); // mở thì tắt, tắt thì mở
    };

    const onToggleDropdown = () => {
        setIsOpenBlock(!isOpenBlock)
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpenBlock(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="comment-item-child">
            <div className="d-flex align-items-center justify-content-between">
                <div className="position-relative d-flex align-items-start">
                    <PopupAuthorInfo avatar={avatar} endPublisher={endPublisher} isChild={true} />
                    <span className="comment-item-author text-main-gray mt-1 whitespace-nowrap fs-5">北京男</span>
                    <Image
                        alt='vip1'
                        src="/level/lv_3.png"
                        width={29}
                        height={13}
                        className="ms-2 mt-3"
                    />
                    <p className="text-color-main fs-5 ms-3 mt-1">: {text}</p>

                </div>
                <div ref={dropdownRef} className="position-relative d-inline-block">
                    <div
                        onClick={onToggleDropdown}
                        className=" d-flex align-items-center">
                        <IoMdMore className="fs-3 cursor-pointer" />
                    </div>

                    {isOpenBlock &&
                        <div className="wrap-block">
                            <span className="text-white text-pink-hover px-3 py-2 whitespace-nowrap cursor-pointer" onClick={() => setIsOpenAuthModal(true)}>举报 </span>
                            <span className="text-white text-pink-hover px-3 py-2 whitespace-nowrap cursor-pointer">拉黑</span>
                        </div>
                    }
                </div>
            </div>

            <div className="comment-item-content">

                <div className="d-flex align-items-center">
                    <span className="text-main-gray fs-5 mt-3">2025-10-12</span>
                    <div
                        onClick={() => setLoginNotiModal({
                            content: "您还没有登录，无法继续操作"
                        })}
                        className="d-flex align-items-center gap-3 text-main-gray text-pink-hover cursor-pointer fs-5 action-like-comment ">
                        <AiFillLike />
                        <span>1</span>
                    </div>
                    <span onClick={() => toggleReply(id)} className="text-main-gray text-pink-hover cursor-pointer ">回复</span>
                </div>
            </div>

            {
                replyingTo === id &&
                <BoxComment
                    closeBoxComment={() => toggleReply(id)}
                />
            }
        </div>
    );
}