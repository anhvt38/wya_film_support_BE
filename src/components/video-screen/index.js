"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaPlay, FaRegPlayCircle } from "react-icons/fa";
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
import { IoMdPause, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { CommonVolume } from "../common-volume";
import { AdsOnVideo } from "../ads-on-video";
import Draggable from "react-draggable";
import { VideoEndScreen } from "../video-end-screen";
import { usePathname } from "next/navigation";
import { routes } from "@/contants/routes";


export const VideoScreen = (props) => {
    const { id, item, videoDetail, isPlay, soundValue, videoRef, onPlay, isFloatingVideo, onChangeFloatingVideo, relatedVideos, publisher, onEndVideo } = props || {};
    const { title } = videoDetail || {};

    const pathname = usePathname();

    const [isMuted, setIsMuted] = useState(true);
    const [isShowAds, setIsShowAds] = useState(false);
    const [isShowRelatedVideos, setIsShowRelatedVideos] = useState(false);
    const [isShowBigBtn, setIsShowBigBtn] = useState(false);

    const onPlayVideo = () => {
        if (!isFloatingVideo) {
            onPlay()
        }
    }

    useEffect(() => {
        if (!videoRef.current) return;
        if (isPlay) {
            videoRef.current.play();
            setIsShowAds(false)
            setIsShowBigBtn(true)
            setTimeout(() => {
                setIsShowBigBtn(false);
            }, 1000);
        } else {
            videoRef.current.pause();
            setIsShowAds(true)

        }
    }, [isPlay])


    useEffect(() => {
        videoRef.current.pause()
        setIsShowAds(false)

    }, [])

    useEffect(() => {
        const video = videoRef.current;

        const handleEnded = () => {
            setIsShowRelatedVideos(true)
            if (pathname != routes.watch) {
                setIsShowAds(true)
            }
            onEndVideo()
        };

        if (video) {
            video.addEventListener('ended', handleEnded);
        }

        // Cleanup khi unmount
        return () => {
            if (video) {
                video.removeEventListener('ended', handleEnded);
            }
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = soundValue;
        }
        setIsMuted(!soundValue)
    }, [soundValue])


    return (
        <Draggable disabled={!isFloatingVideo} >
            <div className={` h-full ${isFloatingVideo ? 'floating-video' : 'static-video'}`}>
                {
                    !isFloatingVideo &&
                    <div className="title-on-video d-flex align-items-center gap-3 mb-4">
                        <Image alt='logo-title' src="/images/logo.png" width={30} height={30} />
                        <h3 className="text-white m-0 d-inline-block">{title}</h3>
                    </div>
                }
                <video
                    ref={videoRef}
                    muted={isMuted}
                    controls={false}
                    preload="none"
                    className='video-screen'
                    onClick={onPlayVideo}
                />

                {
                    !isFloatingVideo &&
                        isPlay
                        ? isShowBigBtn && <ImPause className="action-video-btn" />
                        : <FaRegPlayCircle className="action-video-btn" />

                }


                {
                    !isFloatingVideo && isShowRelatedVideos && pathname == routes.watch &&
                    <VideoEndScreen
                        relatedVideos={relatedVideos}
                        publisher={publisher}
                        onPlayAgain={() => {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                            setIsShowRelatedVideos(false)
                        }}
                    />
                }
                {
                    isFloatingVideo &&
                    <div>
                        <IoClose className="close-float-video" onClick={() => {
                            onChangeFloatingVideo(false)
                        }} />
                        <div
                            onClick={onPlay}
                            className="text-white-hover ic-play-float">
                            {isPlay ? <IoMdPause className="btn-play-video" /> : <FaPlay className="btn-play-video" />}
                        </div>
                    </div>
                }

                {
                    isShowAds &&
                    <AdsOnVideo closeAds={() => setIsShowAds(false)} />
                }
            </div>
        </Draggable>
    )
}
