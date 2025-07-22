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

export default function BoxComment(props) {
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
        <div className="box-comment" style={{ background: isLogined ? '#000000b3' : "#1d1d1d" }}>
            {
                isLogined
                    ? <div>
                        {
                            !isMultiComment &&
                            <p className="mb-3">请在此发表意见</p>
                        }
                        <textarea onChange={onChangeComment} rows={4} placeholder={isMultiComment ? "在此输入回复内容" : "注意，以下行为将被封号：政治言论、严重剧透、发布广告、木马链接、宣传同类网站、辱骂工作人员等。"}></textarea>
                    </div>

                    : <div style={{ height: "120px" }}>
                    </div>
            }

            {
                isMultiComment &&
                <IoCloseSharp className="close-box-comment fs-1" onClick={closeBoxComment} />
            }
            <div className="d-flex justify-content-between">
                <div className="d-flex gap-4 align-items-end">
                    <div className="wrap-ic-table">
                    <IconTable />
                    
                    </div>
                    {
                        !isMultiComment &&
                        <div
                            onClick={() => setLoginNotiModal({
                                content: "此功能仅限 VIP 用户使用",
                                acceptText: "升级VIP"
                            })}
                            className="ms-3 d-flex gap-2 align-items-end cursor-pointer">
                            <IoMdStats className="fs-3" />
                            <span>发起投票</span>
                        </div>
                    }
                    <CustomSwitch label={!isOn ? "打开匿名" : "取消匿名"} checked={isOn} onChange={setIsOn} />
                </div>
                <div className="d-flex align-items-end gap-4">
                    {
                        tooLengthText &&
                        <span className="text-red">您发表的内容过长，请简短发言</span>
                    }
                    <span className="text-main-gray">{value.length}/{MAX_LENGTH_COMMENT}</span>
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