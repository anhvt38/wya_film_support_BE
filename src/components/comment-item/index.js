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
import { getImgSrcByUserLevel } from "@/utils/common";



export default function CommentItem(props) {
    const { avatar = '', endPublisher = {}, item } = props || {};
    const { id, likes, headImage, context, nickName, post_Date, userLevel } = item || {};

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
        <div className="comment-item">
            <div className="d-flex align-items-center justify-content-between">
                <div className="position-relative d-flex align-items-center">
                    <PopupAuthorInfo avatar={headImage} endPublisher={endPublisher} />
                    <span className="comment-item-author text-main-gray">{nickName}</span>
                    {
                        userLevel > 1 &&
                        <Image
                            alt='vip1'
                            src={getImgSrcByUserLevel(userLevel)}
                            width={29}
                            height={13}
                            className="ms-2"
                        />
                    }

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
                <p className="text-color-main fs-5 mb-3">{context}</p>
                <div className="d-flex align-items-center">
                    <span className="text-main-gray fs-5">{post_Date}</span>
                    <div
                        onClick={() => setLoginNotiModal({
                            content: "您还没有登录，无法继续操作"
                        })}
                        className="d-flex align-items-center gap-3 text-main-gray text-pink-hover cursor-pointer fs-5 action-like-comment ">
                        <AiFillLike />
                        <span>{likes}</span>
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