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
import { getVideoDetail } from "@/apis/detail-page";
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
import dayjs from "dayjs";


export const VideoMoreDetail = (props) => {
    const { id, item, videoDetail } = props || {};
    const { title, view, addTime, tags } = videoDetail || {};

    const [isShowIntroduce, setIsShowIntroduce] = useState(false);




    return (
        <div className="video-more-detail">
            <h1 className="text-white fs-2">{ title }</h1>
            <div className="my-4 d-flex gap-5">
                <div className={`d-flex align-items-center gap-1 fs-5 cursor-pointer ${isShowIntroduce ? 'text-pink' : "text-color-main"}`}
                    onClick={() => setIsShowIntroduce(!isShowIntroduce)}
                >
                    <MdOutlineNewspaper />
                    <span>简介</span>
                    {
                        isShowIntroduce ? <IoIosArrowUp /> : <IoIosArrowDown />
                    }
                    
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span>{dayjs(addTime).format('YYYY-MM-DD HH:mm')}</span>
                    <FaFireFlameCurved className="fs-3 text-danger" />
                    <span>{view}</span>
                </div>
            </div>
            <CCollapse visible={isShowIntroduce}>
                <div className="fs-5">
                    分类: {` `}
                    {
                        _.reduce(tags, (str, item, index) => {
                            return str + `${item}${index != tags.length - 1 ? ',' : ''}`
                        }, ``)
                    }
                </div>
                <div className="fs-5">
                    {/* Vũ khí: Bộ binh */}
                </div>
      </CCollapse>
        </div>
    )
}
