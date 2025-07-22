"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { convertHotView, highlightKeywordInText, textColorByOrder } from "@/utils/common";
import { CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import SelectCidVideo from "../select-cid-video";
import { BiLike, BiMessageDots } from "react-icons/bi";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaFireFlameCurved } from "react-icons/fa6";
import dayjs from "dayjs";
import { routes } from "@/contants/routes";

export default function SearchEuroItem(props) {
    const { item, keyword } = props || {};
    const { contxt, cid, comments, favoriteCount, hot, imgPath, sNo, starring, title, pingFen, addTime, lastName } = item || {};

    const convertLink = `${imgPath?.slice(0, imgPath.length - 5) + "." + imgPath.slice(imgPath.length - 3)}?w=216&h=309&format=jpg&mode=stretch`;
    return (
        <div className="search-euro-item mb-5">
            <Link href={`${routes.play}/${contxt}`}>
                <Image alt='thumbnail' src={convertLink} width={0} height={0} sizes="100vw" />
            </Link>
            <div className="search-euro-item-right">
                <div className="d-flex align-items-center gap-3">
                    <Link href={`${routes.play}/${contxt}`} className="text-white text-pink-hover truncate-one-line">
                        <h4>
                            {highlightKeywordInText(title, keyword)}

                        </h4>
                    </Link>
                    <div className="search-euro-tags">
                        <span>{cid}</span>
                        <span>{dayjs(addTime).format('YYYY')}</span>
                    </div>
                    <strong className="">{pingFen}</strong>
                    <div className="d-flex gap-5">
                        <div className="d-flex gap-1 align-items-center text-main-gray">
                            <BiMessageDots />
                            <span>{comments}</span>
                        </div>
                        <div className="d-flex gap-1 align-items-center text-main-gray">
                            <AiFillLike />
                            <span>{favoriteCount}</span>
                        </div>
                        <div className="d-flex gap-1 align-items-center text-main-gray">
                            <AiFillDislike />
                            <span>0</span>
                        </div>
                        <div className="d-flex gap-1 align-items-center text-main-gray">
                            <FaFireFlameCurved />
                            <span>{convertHotView(hot)}</span>
                        </div>


                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-main-gray">更新: <span className="text-color-main">{lastName}</span></div>
                    <div className="text-main-gray">女优 <Link href="/" className="text-pink-hover text-color-main">{starring}</Link></div>
                </div>
            </div>
        </div>
    )

}