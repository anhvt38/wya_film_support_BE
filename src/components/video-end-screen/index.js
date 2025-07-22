"use client"

import { CButton, CCollapse, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoClose, IoEyeOutline, IoMaleFemaleOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaPlay, FaRegPlayCircle, FaRegStar } from "react-icons/fa";
import _ from "lodash-es";
import { convertHotView, ensureHttps, getMediaPlaylistUrl } from "@/utils/common";
import { TbZoomScan } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { useQuery } from "react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { getInfoVideoDetail, getVideoDetail } from "@/apis/detail-page";
import Hls from "hls.js";
import { ImPause } from "react-icons/im";
import { CommonDropdown } from "../common-dropdown";
import { VIDEO_SPEEDS } from "@/contants/time";
import { MdKeyboardDoubleArrowRight, MdOutlineNewspaper, MdOutlineReplay } from "react-icons/md";
import { CommonDropdownHover } from "../common-dropdown-hover";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp, IoMdPause, IoMdPhonePortrait, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { CommonVolume } from "../common-volume";
import { AdsOnVideo } from "../ads-on-video";
import Draggable from "react-draggable";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { routes } from "@/contants/routes";


export const VideoEndScreen = (props) => {
    const { id, publisher, relatedVideos, onPlayAgain } = props || {};
    const data = _.slice(relatedVideos, 0, 6);

    const [isMuted, setIsMuted] = useState(true);
    const [isShowIntroduce, setIsShowIntroduce] = useState(false);
    const { title, avatar, hot, gender, from, likes, slogon, videoCount, fansCount  } = publisher || {};

    return (
        <div className="video-end-screen">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <Image
                        alt='avatar'
                        src={ensureHttps(avatar)}
                        width={60}
                        height={60}
                        className="rounded-circle objectfit-cover cursor-pointer"

                    />
                    <div>
                        <h5 className="fw-normal truncate-one-line text-color-main">{title} <IoMaleFemaleOutline className="text-blue fw-bold ms-2" /></h5>
                        <CButton className="bg-pink text-white rounded-0 px-3 py-1">+ 关注 {fansCount}</CButton>
                    </div>
                </div>
                <CListGroup layout="horizontal" className="gap-1">
                    <CListGroupItem className="text-pink-hover white-space-nowrap d-flex flex-column align-items-center cursor-pointer fs-5 text-color-main"
                        onClick={onPlayAgain}
                    >
                        <MdOutlineReplay className="fs-2" />
                        <span>重播</span>
                    </CListGroupItem>
                    <CListGroupItem className="text-pink-hover white-space-nowrap d-flex flex-column align-items-center cursor-pointer fs-5 text-color-main">
                        <AiFillLike className="fs-2" />
                        <span>点赞</span>
                    </CListGroupItem>
                    <CListGroupItem className="text-pink-hover white-space-nowrap d-flex flex-column align-items-center cursor-pointer fs-5 text-color-main">
                        <AiFillDislike className="fs-2" />
                        <span>点踩</span>
                    </CListGroupItem>
                    <CListGroupItem className="text-pink-hover white-space-nowrap d-flex flex-column align-items-center cursor-pointer fs-5 text-color-main">
                        <FaRegStar className="fs-2" />
                        <span>收藏</span>
                    </CListGroupItem>
                    <CListGroupItem className="text-pink-hover white-space-nowrap d-flex flex-column align-items-center cursor-pointer fs-5 text-color-main">
                        <IoShareSocialOutline className="fs-2" />
                        <span>分享</span>
                    </CListGroupItem>

                </CListGroup>
            </div>

            <div className="mt-4 top-related-videos">
                {
                    _.map(data, (item, index) => {
                        return (
                            <div className="position-relative cursor-pointer" key={index}>
                                <Image alt={item.title} sizes="100vw" src={item.imgPath} width={0} height={0} className="" />
                                <small className="position-absolute text-white bottom-0 truncate-one-line px-1">{item.title}</small>
                                {
                                    index != data.length - 1
                                        ? <div className="related-video-overlay">
                                            <FaRegPlayCircle className="fs-1" />
                                        </div>
                                        : <div className="related-video-overlay-blur">
                                            <Link href="/" className="position-absolute text-white d-flex justify-content-center align-items-center w-full h-full top-0 left-0 text-pink-hover">
                                            <small>
                                            Thêm video ngắn<IoIosArrowForward />    
                                            </small> </Link>
                                        </div>
                                }

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
