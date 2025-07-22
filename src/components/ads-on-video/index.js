"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
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
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CommonDropdownHover } from "../common-dropdown-hover";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { CommonVolume } from "../common-volume";


export const AdsOnVideo = (props) => {
    const { closeAds} = props || {};

    const [isShowBtn, setIsShowBtn] = useState(false);



    return (
        <div className="ads-on-video">
            <div className="position-relative h-full">
                <IoClose className="close-ads" onClick={closeAds} />
                <Image
                    alt={'ads'}
                    src={"/ads-on-video.jpg"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full objectfit-contain"
                />
                <div className="d-flex justify-content-center">
                    <div className="py-4 "
                    style={{width: "30%"}}
                    onMouseMove={() => setIsShowBtn(true)}
                    onMouseLeave={() => setIsShowBtn(false)}

                >
                    {
                        !isShowBtn
                            ? <Image
                                alt={'btn-ads'}
                                src={"/btn-ads-video.png"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="cursor-pointer btn-ads"
                            />
                            : <Image
                                alt={'btn-ads'}
                                src={"/btn-ads-hover.png"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="cursor-pointer btn-ads"
                            />

                    }

                </div>
                </div>
            </div>
        </div>

    )
}
