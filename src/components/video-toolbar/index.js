"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved, FaRegCircleQuestion } from "react-icons/fa6";
import { IoClose, IoEyeOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaPlay, FaRegPlayCircle, FaRegStar } from "react-icons/fa";
import _ from "lodash-es";
import { convertHotView, getMediaPlaylistUrl } from "@/utils/common";
import { TbZoomScan } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { useQuery } from "react-query";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getVideoDetail } from "@/apis/detail-page";
import Hls from "hls.js";
import { ImPause } from "react-icons/im";
import { CommonDropdown } from "../common-dropdown";
import { VIDEO_SPEEDS } from "@/contants/time";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CommonDropdownHover } from "../common-dropdown-hover";
import { IoMdPause, IoMdPhonePortrait, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { CommonVolume } from "../common-volume";
import { AdsOnVideo } from "../ads-on-video";
import Draggable from "react-draggable";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MainContext } from "@/layouts/MainLayout";
import { QrDownloadInfo } from "../QrDownloadInfo";


export const VideoToolbar = (props) => {
    const { id, item, videoDetail } = props || {};
    const { favoriteCount, shared } = videoDetail || {};
    const [isMuted, setIsMuted] = useState(true);
    const [isShowAds, setIsShowAds] = useState(false);
    const [isOpenDownloadInfo, setIsOpenDownloadInfo] = useState(false);

    const { setLoginNotiModal } = useContext(MainContext);

    console.log(videoDetail, 'videoDetail')

    return (
        <CListGroup layout="horizontal" className="video-toolbar" >
            <CListGroupItem className="text-pink-hover" onClick={() => setLoginNotiModal({
                content: "您还没有登录，无法继续操作"
            })}>
                <AiFillLike />
                <span>赞</span>
            </CListGroupItem>
            <CListGroupItem className="text-blue-hover" onClick={() => setLoginNotiModal({
                content: "您还没有登录，无法继续操作"
            })}>
                <AiFillDislike />
                <span>踩</span>
            </CListGroupItem>
            <CListGroupItem className="text-pink-hover" onClick={() => setLoginNotiModal({
                content: "您还没有登录，无法继续操作"
            })}>
                <FaRegStar />
                <span>{favoriteCount}</span>
            </CListGroupItem>
            <CListGroupItem className="text-pink-hover">
                <IoShareSocialOutline />
                <span>{shared}</span>
            </CListGroupItem>
            <CListGroupItem className="text-pink-hover" onClick={() => setLoginNotiModal({
                content: "您还没有登录，无法继续操作"
            })}>
                <FaRegCircleQuestion />
            </CListGroupItem>
            <CListGroupItem className="text-white watch-on-phone">

                <CommonDropdown
                    isOpen={isOpenDownloadInfo}
                    toggle={(value) => setIsOpenDownloadInfo(value)}
                >
                    {[
                        <div key="button">
                            <IoMdPhonePortrait />
                            <span>手机看</span>
                        </div>,
                        <div key="option" className="option-common-dropdown">
                            <QrDownloadInfo />
                        </div>]}
                </CommonDropdown>
            </CListGroupItem>
        </CListGroup>
    )
}
