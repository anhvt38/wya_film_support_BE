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
import CustomSwitch from "../custom-switch";

const MAX_LENGTH_COMMENT = 255;

export default function BoxCommentActress(props) {
    const { isMultiComment = true, closeBoxComment } = props || {};
    const isLogined = false;

    const [isOn, setIsOn] = useState(false);
    const [value, setValue] = useState('');
    const [tooLengthText, setTooLengthText] = useState(false);

    const { setLoginNotiModal, setMainNoti, setIsOpenAuthModal } = useContext(MainContext);

    const onChangeComment = (e) => {
        setValue(e.target.value);
        if (e.target.value.length > MAX_LENGTH_COMMENT) {
            setTooLengthText(true)
        } else {
            setTooLengthText(false)

        }

    }

    const sendComment = () => {
        if (tooLengthText) {
            setMainNoti({
                content: "您发表的内容过长，请简短发言"
            })
        }
    }


    return (
        <div className="box-comment-actress">
            {
                isLogined
                    ? <div>
                        <textarea onChange={onChangeComment} placeholder={isMultiComment ? "在此输入回复内容" : "我来说一说..."}></textarea>
                    </div>

                    : <div style={{ height: "54px" }}>
                    </div>
            }

            
            <div className="d-flex justify-content-between mt-3">
                <div className="d-flex gap-4 align-items-center">
                    <span className="text-main-gray fs-6">{value.length}/{MAX_LENGTH_COMMENT}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                    {
                        tooLengthText &&
                        <span className="text-red">您发表的内容过长，请简短发言</span>
                    }
                    <div className="wrap-ic-table-actress">
                        <IconTable />

                    </div>

                    {
                    isMultiComment &&
                    <span className="text-white-hover cursor-pointer fs-6" onClick={closeBoxComment}>取消</span>
                }
                    <CButton className="btn-send-comment " onClick={sendComment}>发送</CButton>
                </div>
            </div>

            {
                !isLogined &&
                <div className="overlay-comment">
                    <p>您还未登录，请登录后再发表评论。</p>
                    <CButton className="" onClick={() => setIsOpenAuthModal(true)}>登录</CButton>

                </div>
            }
        </div>
    );
}