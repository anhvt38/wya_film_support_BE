"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { getImgSrcByUserLevel, getSexIcon, highlightKeywordInText, textColorByOrder } from "@/utils/common";
import { CButton, CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose, IoMaleFemaleOutline } from "react-icons/io5";
import SelectCidVideo from "../select-cid-video";
import { BiLike, BiMessageDots } from "react-icons/bi";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import _ from 'lodash-es';
import { formatVideoDuration } from "@/utils/time";
import { routes } from "@/contants/routes";
import { MainContext } from "@/layouts/MainLayout";

export default function SearchUserItem(props) {
    const { movies = [], videos = [], item, keyword } = props || {};
    const { userKey, country, currentLevel, fansCount, headImg, nickName = "ok 12 ok", sayGoodCount, sex, signature, smallVideoList, videoCount, videoList
    } = item || {};
        const { setIsOpenAuthModal } = useContext(MainContext);
    

    return (
        <div className="search-user-item mb-5">
            <Link href={`${routes.space}/${userKey}`}>
                <Image alt='thumbnail' src={headImg} width={0} height={0} sizes="100vw" />
            </Link>
            <div className="search-user-item-right">
                <div className="d-flex align-items-center gap-3">
                    <Link href={`${routes.space}/${userKey}`} className="text-color-main text-pink-hover truncate-one-line">
                        <h4>
                            {highlightKeywordInText(nickName, keyword)}
                        </h4>
                    </Link>
                    {
                        getSexIcon(sex)
                    }
                    <Image
                        alt='vip1'
                        src={getImgSrcByUserLevel(currentLevel)}
                        width={36}
                        height={18}
                        className="ms-2"
                    />
                    {
                        country &&
                        <div className="d-flex align-items-center gap-1">
                            <FiMapPin />
                            <span>{country}</span>
                        </div>
                    }

                </div>
                <div className="my-4 text-main-gray">
                    {signature || "没有个性所以没有签名"}
                </div>
                <div className="d-flex gap-5">
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-main-gray">粉丝</span>
                        <span className="text-main-color fs-5">{fansCount}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-main-gray">粉丝</span>
                        <span className="text-main-color fs-5">{videoCount}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-main-gray">粉丝</span>
                        <span className="text-main-color fs-5">{sayGoodCount}</span>
                    </div>
                </div>
                {
                    !!videoList?.length &&
                    <div className="mt-2 list-movie-search">
                        <span className="text-pink">
                            剧集
                        </span>
                        <div>
                            {
                                _.map(videoList, (item, index) => {
                                    return (
                                        <Link key={index} href={`${routes.play}?id=${item.key}`} className="list-movie-search-item">
                                            <Image alt='thumbnail' src={item.imgPath} width={0} height={0} sizes="100vw" />
                                            <p className="truncate-one-line text-color-main mt-2 ">{item.title}</p>
                                        </Link>
                                    )
                                })
                            }
                            <Link href={`${routes.space}/${userKey}`} className="text-color-main text-pink-hover fs-5">
                                更多 &gt;
                            </Link>
                        </div>
                    </div>
                }

                {
                    !!smallVideoList?.length &&
                    <div className="mt-2 list-video-search">
                        <span className="text-pink">
                            小视频
                        </span>
                        <div>
                            {
                                _.map(smallVideoList, (item, index) => {
                                    const { title, imgPath, lastSeconds, key } = item || {};
                                    return (
                                        <Link key={index} href={`${routes.watch}?v=${key}`} className="list-video-search-item">
                                            <div className="position-relative">
                                                <Image alt='thumbnail' src={imgPath} width={0} height={0} sizes="100vw" />
                                                <div className="video-search-item-time">{lastSeconds}</div>
                                            </div>
                                            <p className="truncate-one-line text-color-main mt-2 ">{title}</p>
                                        </Link>
                                    )
                                })
                            }
                            
                            <Link href={`${routes.space}/${userKey}`} className="text-color-main text-pink-hover fs-5">
                                更多 &gt;
                            </Link>
                        </div>
                    </div>
                }

            </div>

            <button className="fs-5" onClick={() => setIsOpenAuthModal(true)}>关注 </button>
        </div>
    )
}