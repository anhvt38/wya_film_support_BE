"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import { NewVideoItem } from "../new-video-item";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { MainVideoItem } from "../main-video-item";
import _ from 'lodash-es';
import { ActressAlbumItem } from "../actress-album-item";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoDiamondOutline } from "react-icons/io5";
import { PiDeviceMobileSpeakerBold } from "react-icons/pi";
import { getAllInOneType, getMainMenus } from "@/apis/homepage";
import { useQuery } from "react-query";
import qs from 'qs';
import { routes } from "@/contants/routes";


export const TagsHomepage = (props) => {
    const { title = '' } = props;

    const [allTypeNums, setAllTypeNums] = useState(16);
    const [params, setParams] = useState({
        cinema: 2,
        cid: "0,2,10",
        vv: "0e9d44934cb8274fd04cee2e49e80c1c",
        pub: "1751450322644"
    })

    const [allTypeParams, setAllTypeParams] = useState({
        cinema: 2,
        vv: "108d726b563004b644b88174a010d775",
        pub: "1751450322644"
    })

    const { data: mainMenuDatas, isLoading }
        = useQuery({
            queryKey: ['main-menus'],
            queryFn: () => {
                return getMainMenus({
                    ...params
                })
            },
        })

    const { data: allInOneTypeDatas }
        = useQuery({
            queryKey: ['all-in-one-type'],
            queryFn: () => {
                return getAllInOneType({
                    ...allTypeParams
                })
            },
        })

    const { data: mainMenus } = mainMenuDatas || {};
    const { data: allInOneTypes } = allInOneTypeDatas || {};

    const allTypes = allInOneTypes?.info[0]?.fav;

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1912) setAllTypeNums(38)
            else if (width >= 1679) setAllTypeNums(28)
            else if (width >= 1440) setAllTypeNums(20)
            else if (width >= 1280) setAllTypeNums(16)
                else if (width >= 992) setAllTypeNums(12)

        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="tags-homepage d-flex justify-content-between align-items-end mb-4 mt-5">
            <div className="tags-homepage-left col-5 col-xl-auto">
                <CListGroup layout="horizontal" className="flex-wrap gap-row-2">
                    {
                        _.map(mainMenus?.info, (item, index) => {
                            const { label, link, notifications, isHot, params } = item || {};
                            return (
                                <CListGroupItem key={index} className="p-0 me-2">
                                    <Link href={`${link}${qs.stringify(params) ? `?${qs.stringify(params)}` : ""}`} className="text-white d-flex align-items-center">
                                        <span className='text-white-hover white-space-nowrap fs-5'>{label}</span>
                                        {
                                            (notifications > 0 || isHot) &&
                                            <small className='bg-red rounded px-2 ms-1' >{isHot ? 'HOT' : notifications > 0 ? notifications : 0}</small>
                                        }
                                    </Link>
                                </CListGroupItem>
                            )
                        })
                    }
                </CListGroup>
            </div>
            <div className="tags-homepage-middle col-auto col-xl-auto border-start border-end px-4">
                <CListGroup layout="horizontal" className=" flex-wrap">
                    {
                        _.map(_.slice(allTypes, 0, allTypeNums), (item, index) => {
                            return (
                                <CListGroupItem key={index} className="py-0 text-center">
                                    <Link href={`${routes.mainList}?tag=${item.tag}`} className="text-white-hover">
                                        <span className="white-space-nowrap fs-5">{item.tag}</span>
                                    </Link>
                                </CListGroupItem>
                            )
                        })
                    }

                </CListGroup>
            </div>
            <div className="tags-homepage-right col-auto d-flex justify-content-center align-items-center gap-5">
                <Link href={routes.vipCenterIndex} className="d-flex flex-column align-items-center text-pink-hover gap-3">
                    <IoDiamondOutline className="fs-5" />
                    <span className="text-center whitespace-nowrap fs-5">VIP</span>
                </Link>
                <Link href={routes.adCenter} className="d-flex flex-column align-items-center text-pink-hover gap-3">
                    <RiAdvertisementLine className="fs-5" />
                    <span className="text-center whitespace-nowrap fs-5">广告</span>
                </Link>
                <Link href={routes.appDownload} className="d-flex flex-column align-items-center text-pink-hover gap-3">
                    <PiDeviceMobileSpeakerBold className="fs-5" />
                    <span className="text-center whitespace-nowrap fs-5">App</span>
                </Link>
            </div>
        </div>

    )
}
