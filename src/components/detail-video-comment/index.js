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
import { FaCommentDots } from "react-icons/fa";
import BoxComment from "../box-comment";
import CommentList from "../comment-list";

const ALL_CMT = [
    {
        id: 0,
        text: "鉴定完毕",
        isParent: true,
        childs: [
            {
                id: 100,
                text: "北京男"
            },
            {
                id: 101,
                text: "天津女",
                replyCmtId: 100
            }
        ]
    },
    {
        id: 1,
        text: "鉴定完毕",
        isParent: true,

    },
    {
        id: 2,
        text: "鉴定完毕",
        isParent: true,

    }
]

export default function DetailVideoComment(props) {
    const { } = props || {};




    return (
        <div className="detail-video-comment">
            <div className="d-flex gap-2 align-items-end">
                <FaCommentDots className="fs-1 text-pink" />
                <h3 className="text-white m-0"> 评论区</h3>
                <span className="text-white">(23)</span>
            </div>
            <BoxComment isMultiComment={false} />
            <div className="comment-content">
                <CTabs activeItemKey={2} defaultActiveItemKey={1}>
                    <CTabList className="comment-content-tabs">
                        <CTab className="" aria-controls="all-comment" itemKey={1}> 全部评论 </CTab>
                        <CTab aria-controls="hot-comment" itemKey={2}> 热门评论 </CTab>
                    </CTabList>
                    <CTabContent className="mt-4">
                        <CTabPanel aria-labelledby="all-comment" itemKey={1}>
                            <CommentList datas={ALL_CMT} />
                        </CTabPanel>
                        <CTabPanel aria-labelledby="hot-comment" itemKey={2}>
                            <CommentList datas={ALL_CMT} />
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </div>
        </div>
    );
}