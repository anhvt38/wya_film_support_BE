"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { textColorByOrder } from "@/utils/common";
import { CButton, CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose, IoEyeOutline, IoMaleFemaleOutline } from "react-icons/io5";
import SelectCidVideo from "../select-cid-video";
import { BiLike, BiMessageDots } from "react-icons/bi";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaRegImage, FaRegStar } from "react-icons/fa";
import { MainContext } from "@/layouts/MainLayout";
import { routes } from "@/contants/routes";
import { MAIN_TYPES } from "@/contants/variables";

export default function SearchAlbumItem(props) {
    const { item, keyword } = props || {};
    const { userKey, imgPath, headImg, favoriteCount, photoCount, title, viewCount, comments, albumID } = item || {};

    const { setIsOpenAuthModal } = useContext(MainContext);
    const text = "发布了动态";

    return (
        <div className="search-album-item mb-5">
            <Link href={`${routes.space}/${userKey}?type=${MAIN_TYPES.album}&a=${albumID}`}>

                <div className="search-album-item-top">
                    <Image alt='thumbnail' src={imgPath} width={0} height={0} sizes="100vw" />
                    <div className="image-total-badge">
                        <FaRegImage />
                        <span>{photoCount}</span>
                    </div>
                </div>
            </Link>


            <div className="d-flex flex-column justify-content-between py-2">
                <Link href={`${routes.space}/${userKey}?type=${MAIN_TYPES.album}&a=${albumID}`}>
                    <h4 className=" text-pink-hover text-white">
                        {title}
                    </h4>
                </Link>

                <div className="d-flex gap-5">
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5">
                        <IoEyeOutline />
                        <span>{viewCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5">
                        <BiMessageDots />
                        <span>{comments}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover" onClick={() => setIsOpenAuthModal(true)}>
                        <FaRegStar />
                        <span>{favoriteCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover" onClick={() => setIsOpenAuthModal(true)}>
                        <AiFillLike />
                        <span>{comments}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}