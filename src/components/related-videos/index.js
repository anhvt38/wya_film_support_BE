"use client"

import { CCollapse, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoClose, IoEyeOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaPlay, FaRegPlayCircle, FaRegStar } from "react-icons/fa";
import _ from "lodash-es";
import { convertHotView, getMediaPlaylistUrl } from "@/utils/common";
import { TbZoomScan } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { useQuery } from "react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRelatedVideo, getVideoDetail } from "@/apis/detail-page";
import Hls from "hls.js";
import { ImPause } from "react-icons/im";
import { CommonDropdown } from "../common-dropdown";
import { VIDEO_SPEEDS } from "@/contants/time";
import { MdKeyboardDoubleArrowRight, MdOutlineNewspaper } from "react-icons/md";
import { CommonDropdownHover } from "../common-dropdown-hover";
import { IoIosArrowDown, IoIosArrowUp, IoMdPause, IoMdPhonePortrait, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { CommonVolume } from "../common-volume";
import { AdsOnVideo } from "../ads-on-video";
import Draggable from "react-draggable";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { formatVideoDuration } from "@/utils/time";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { routes } from "@/contants/routes";


export const RelatedVideos = (props) => {
    const { id, data } = props || {};
    const pathname = usePathname();

    return (
        <div className="related-videos">
            <div className="d-flex align-items-center gap-3 mb-4">
                <Image alt='logo-title' src="/images/logo.png" width={20} height={20} />
                    <h3 className="text-white m-0 d-inline-block">{pathname == routes.watch ?  "即将播放" : "相关内容"}</h3>
            </div>
            <div>

                <CListGroup layout="vertical" className="gap-2" >
                    {
                        _.map(data, (item, index) => {
                            return (
                                pathname == routes.watch
                                ? <CListGroupItem className="d-flex gap-3 align-items-start px-0" key={index}>
                                    <div className="position-relative">
                                        <Link href="/">
                                            <Image alt={item.title} src={item.imgPath} width={185} height={102} className="objectfit-cover" />
                                        </Link>
                                        <div className="view-time-video">
                                            <div className="text-white">
                                                <FaFireFlameCurved className="text-danger" />
                                                {item.hot}
                                            </div>
                                            <span className="text-white">{formatVideoDuration(item.lastSeconds)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href="/">
                                        <h5 className="text-white text-pink-hover mb-4">{item.title}</h5></Link>
                                        <div className="d-flex justify-content-between align-items-center  gap-5">
                                            <Link className="d-flex align-items-center gap-2 " href="/">
                                                <Image alt='avatar' src={item.headImg} width={20} height={20} className="rounded-circle" />
                                                <span className="text-main-gray text-pink-hover">{item.nickName}</span>
                                            </Link>
                                            <span className="text-main-gray">{dayjs(item.addTime).format('YYYY-MM-DD')}</span>
                                        </div>
                                    </div>
                                </CListGroupItem>
                                : <CListGroupItem className="d-flex gap-3 align-items-start px-0" key={index}>
                                    <div className="position-relative">
                                        <Link href="/">
                                            <Image alt={item.title} src={item.imgPath} width={105} height={150} className="objectfit-cover" />
                                        </Link>
                                    </div>
                                    <div className="d-flex flex-column gap-4">
                                        <Link href="/">
                                        <h5 className="text-white text-pink-hover">{item.title}</h5>
                                        </Link>
                                        <div className="d-flex gap-2">
                                            {_.map(`步兵,双飞,欧美`.split(','), (v, i) => (
                                                <span key={i} className=" px-3 text-main-gray bg-secondary-gray">{v}</span>
                                            ))}
                                        </div>
                                        <div>
                                            <span className=" text-main-gray">分类</span>
                                            <span className="text-white">{" 卡通"}</span>
                                        </div>
                                    </div>
                                </CListGroupItem>
                            )
                        })
                    }

                </CListGroup>
            </div>
        </div>
    )
}
