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
import _ from "lodash-es";
import { routes } from "@/contants/routes";
import { MAIN_TYPES } from "@/contants/variables";

export default function SearchActivityItem(props) {
    const { item, keyword } = props || {};
    const { headImg, comments, dateStr, description, favoriteCount, imgPath, label, nickName, photoAlbumDetailsList, photoCount, title, userKey, viewCount, dd } = item || {};
    const { setIsOpenAuthModal } = useContext(MainContext);

    return (
        <div className="search-activity-item mb-5">
            <div className="search-activity-item-top">
                <Link href={`${routes.space}/${userKey}`}>
                    <Image alt='thumbnail' src={headImg} width={0} height={0} sizes="100vw" />
                </Link>
                <div>
                    <div className="d-flex gap-3 align-items-center">
                        <Link href={`${routes.space}/${userKey}`} className="text-white text-pink-hover">
                            <h4 className="m-0 fs-5">{nickName}</h4>
                        </Link>
                        <button className="fs-6"  onClick={() => setIsOpenAuthModal(true)}>关注 </button>

                    </div>
                    <div className="mt-3 d-flex gap-3">
                        <span className="text-main-gray fs-5">{dateStr}</span>
                        <div className=" ms-3">
                            <span className="text-white fs-5">
                                发布了动态
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="mt-3 text-white fs-5">
                    {highlightKeywordInText(description, keyword)}
                </p>
                <div className="activity-item-tags">
                    {
                        _.map(label.split(","), (item, index) => (
                            <span key={index}>{item}</span>
                        ))
                    }
                </div>

                <div className="activity-item-images">
                    {
                        _.map(photoAlbumDetailsList, (item, index) => (
                            <Link href={`${routes.space}/${userKey}?type=${MAIN_TYPES.activity}&pid=${item.pid}`} className="" key={index}>
                                <Image alt='thumbnail' src={item.imgPath} width={0} height={0} sizes="100vw" />
                                {
                                    index > 3 &&
                                    <div className="activity-item-overlay">
                                        + {photoCount - photoAlbumDetailsList?.length}
                                    </div>
                                }
                            </Link>
                        ))
                    }
                </div>

                <div className="d-flex gap-5">
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5">
                        <IoEyeOutline />
                        <span>{viewCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover">
                        <BiMessageDots />
                        <span>{comments}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover" onClick={() => setIsOpenAuthModal(true)}>
                        <FaRegStar />
                        <span>{favoriteCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover" onClick={() => setIsOpenAuthModal(true)}>
                        <AiFillLike />
                        <span>{dd}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}