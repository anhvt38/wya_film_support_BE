"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { highlightKeywordInText, textColorByOrder } from "@/utils/common";
import { CButton, CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose, IoEyeOutline, IoMaleFemaleOutline } from "react-icons/io5";
import SelectCidVideo from "../select-cid-video";
import { BiLike, BiMessageDots } from "react-icons/bi";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { MainContext } from "@/layouts/MainLayout";
import { useParams } from "next/navigation";

export default function EmptySearchResult(props) {
    const { text, isShowAgainOtherText = false, keyword } = props || {};
        
    return (
        <div className="empty-search-result">
            <Image alt='empty' src="/empty-comment.png" width={150} height={105} className="objectfit-contain" />
            <p className="text-color-main fs-5">
                {highlightKeywordInText(text, keyword)}
            </p>
            {
                !!isShowAgainOtherText &&
            <p className="text-white fs-5">尝试另一个词！</p>
            }
        </div>
    )
}