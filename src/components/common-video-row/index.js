"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { routes } from "@/contants/routes";
import { RxReload } from "react-icons/rx";
import { CustomDropdown } from "../custom-dropdown";

export const CommonVideoRow = (props) => {
    const { title = '', moreLink = '', children, isRowLivestream = false, isReload = false, isShowDropdown = false, isSameLink = false } = props || {};

    const getListLinkOfRowVideo = () => {
        let link = routes.list;
        if (isRowLivestream) link = routes.livestreamList;
        if (moreLink == routes.celebrities ) link = routes.celebrities;
        if (isReload) link = routes.discovery;
        if (isSameLink) link = moreLink;
        return link
    }

    return (
        <div className="common-video-row mt-5">
            <div className="w-full d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <div className="d-flex gap-3 align-items-center">
                        {
                            isRowLivestream
                                ? <Image alt='logo-title' src="/images/livestream-title-icon.png" width={20} height={20} />
                                : <Image alt='logo-title' src="/images/logo.png" width={20} height={20} />
                        }

                        <Link href={getListLinkOfRowVideo()}>
                            <h3 className="text-white text-pink-hover m-0 d-inline-block">{title}</h3>
                        </Link>
                        {
                            !!isReload &&
                            <div className="d-flex gap-1 align-items-center cursor-pointer ms-1">
                                <RxReload className='text-pink' />
                                <span className="text-pink"> 换一波 </span>
                            </div>
                        }

                    </div>
                    {
                        !!moreLink &&
                        <Link className="text-pink ms-4" href={moreLink || "/"}>
                            更多的
                            <MdKeyboardArrowRight />
                        </Link>
                    }
                </div>
                {
                    !!isShowDropdown &&
                    <CustomDropdown title="最近更新" >
                        <div
                            className="filter-dropdown-row"
                        >
                            <CListGroup layout="vertical" >
                                <CListGroupItem className="text-pink-hover white-space-nowrap text-center cursor-pointer fs-5">
                                    最近更新
                                </CListGroupItem>
                                <CListGroupItem className="text-pink-hover white-space-nowrap text-center cursor-pointer fs-5">
                                收藏数 
                                </CListGroupItem>
                                <CListGroupItem className="text-pink-hover white-space-nowrap text-center cursor-pointer fs-5">
                                今日最受欢迎 
                                </CListGroupItem>
                                <CListGroupItem className="text-pink-hover white-space-nowrap text-center cursor-pointer fs-5">
                                本周最受欢迎 
                                </CListGroupItem>
                                <CListGroupItem className="text-pink-hover white-space-nowrap text-center cursor-pointer fs-5">
                                本月最受欢迎 
                                </CListGroupItem>
                                <CListGroupItem className="text-pink-hover white-space-nowrap text-center cursor-pointer fs-5">
                                总浏览数  
                                </CListGroupItem>
                            </CListGroup>

                        </div>
                    </CustomDropdown>
                }
            </div>
            {children}
        </div>

    )
}
