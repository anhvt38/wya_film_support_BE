"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { highlightKeywordInText, textColorByOrder } from "@/utils/common";
import { CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import SelectCidVideo from "../select-cid-video";
import dayjs from "dayjs";
import { YYYY_MM_DD_FORMAT } from "@/contants/format";

export default function SearchVideoItem(props) {
    const { item, keyword } = props || {};
    const { videoSumTimes, uploadedby, imgPath, title, addTime } = item || {};

    return (
        <div className="search-video-item mb-5">
            <Link href="/">
                <Image alt='thumbnail' src={imgPath} width={0} height={0} sizes="100vw" />
                <div>{videoSumTimes}</div>
            </Link>
            <div className="search-video-item-right">
                <Link href="/" className="text-pink-hover">
                    <h4>
                        {
                            highlightKeywordInText(title, keyword)
                        }
                    </h4>
                </Link>
                <div>
                    <div className="text-main-gray">时间: <span className="text-color-main">{dayjs(addTime).format(YYYY_MM_DD_FORMAT)}</span></div>
                <div className="text-main-gray">上传者: <Link href="/" className="text-pink-hover text-color-main">{uploadedby}</Link></div>
                </div>
            </div>
        </div>
    )
}