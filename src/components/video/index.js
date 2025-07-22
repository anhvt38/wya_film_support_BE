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
import { MdKeyboardDoubleArrowRight, MdOutlineZoomInMap, MdOutlineZoomOutMap } from "react-icons/md";
import { CommonDropdownHover } from "../common-dropdown-hover";
import { IoIosArrowForward, IoMdPause, IoMdSettings, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { CommonVolume } from "../common-volume";
import { VideoScreen } from "../video-screen";
import { BsArrowsFullscreen } from "react-icons/bs";
import { VIEWPORT_RATIOS } from "@/contants/variables";
import { usePathname } from "next/navigation";
import { routes } from "@/contants/routes";


export const Video = (props) => {
    const { id, paramId, videoDetail, relatedVideos, mediaUrl, publisher } = props || {};
    const pathname = usePathname();
    const videoRef = useRef(null);


    const containerRef = useRef(null);

    const hlsRef = useRef(null);
    const progressBarRef = useRef();

    const [isDragging, setIsDragging] = useState(false);
    const [dragPercent, setDragPercent] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isOpenSelectSpeed, setIsOpenSelectSpeed] = useState(false);
    const [isOpenViewportRatio, setIsOpenViewportRatio] = useState(false);
    const [currentRatio, setCurrentRatio] = useState(VIEWPORT_RATIOS[0].value);
    const [soundValue, setSoundValue] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isFloatingVideo, setIsFloatingVideo] = useState(false);
    const [buffered, setBuffered] = useState(0);


    const handleMouseDown = (e) => {
        setIsDragging(true);
        updateSeek(e);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        updateSeek(e);
    };

    const updateSeek = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, offsetX / rect.width));
        setDragPercent(percent);

        // Nếu muốn phản ánh ngay dot
        setCurrentTime(percent * duration);
    };

    const handleMouseUp = () => {
        if (isDragging) {
            const newTime = dragPercent * duration;
            if (videoRef.current) {
                videoRef.current.currentTime = newTime;
            }
            setIsDragging(false);
        }
    };

    const handleSpeedChange = (v) => {
        const rate = parseFloat(v);
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
            setPlaybackRate(rate);
            setIsOpenSelectSpeed(false)
        }
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            container.requestFullscreen();
            setIsFullscreen(true);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const SpeedButton = () => {
        return (
            <div className="d-flex flex-column align-items-center cursor-pointer text-pink-hover">
                <MdKeyboardDoubleArrowRight className=" fs-3 fw-bold" />
                <span className=" fs-5 fw-bold" style={{ marginTop: '-10px' }}>
                    {
                        _.find(VIDEO_SPEEDS, item => {
                            return item.value == playbackRate
                        }).label
                    }
                </span>

            </div>
        )
    }

    const SpeedOption = () => {
        return (
            <div className="option-common-dropdown">
                <CListGroup layout="horizontal" className="flex-wrap wrap-option-dropdown">
                    {
                        _.map(VIDEO_SPEEDS, (item, index) => {
                            return (
                                <CListGroupItem key={index}
                                    onClick={() => handleSpeedChange(item.value)}
                                    className="cursor-pointer d-flex gap-2 align-items-center fs-5 text-color-main text-pink-hover">
                                    {item.label}
                                </CListGroupItem>
                            )
                        })
                    }
                </CListGroup>
            </div>
        )
    }

    const ViewportRatioButton = () => {
        return (
            <div className="d-flex flex-column align-items-center cursor-pointer text-white-hover">
                <IoMdSettings className="fs-3 fw-bold" />
            </div>
        )
    }

    const ViewportRatioOption = () => {
        return (
            <div className="option-common-dropdown">
                <div className="whitespace-nowrap fs-5 px-4 pt-4">Tỉ lệ khung hình</div>
                <CListGroup layout="horizontal" className="d-flex wrap-option-dropdown  px-4 py-3">
                    {
                        _.map(VIEWPORT_RATIOS, (item, index) => {
                            return (
                                <CListGroupItem key={index}
                                    className="p-0"
                                >
                                    <span
                                        onClick={() => setCurrentRatio(item.value)}
                                        className={`cursor-pointer fs-6 text-color-main whitespace-nowrap px-4 py-1 ${currentRatio == item.value ? 'bg-pink text-white' : ''}`}
                                    >
                                        {item.label}

                                    </span>
                                </CListGroupItem>
                            )
                        })
                    }
                </CListGroup>
            </div>
        )
    }

    const onSetValue = useCallback((volume) => {
        setSoundValue(volume)
    }, [setSoundValue])

    const showCollections = () => {
        let collection = document.querySelector('#wrap-collections');
        collection.style.right = '0'
    }

    const hideCollections = () => {
        let collection = document.querySelector('#wrap-collections');
        collection.style.right = '-100%'
    }

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            setDuration(video.duration);

            if (!isSeeking) {
                setCurrentTime(video.currentTime);
                // setDuration(video.duration);
            }
        };

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateTime);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateTime);
        };
    }, [isSeeking]);

    useEffect(() => {
        const getVideoSource = async () => {
            if (mediaUrl) {
                // let endId = id || paramId;
                // const previewUrl = `${process.env.HOST_API_PREVIEW_VIDEO}?id=${endId}`
                // const mediaUrl = await getMediaPlaylistUrl(previewUrl);
                const defaultVv = `ed2ceb7e632f05c47183cf63d7134944`;
                const defaultPub = `CJSqE3CvDpKmDouoCJatNrPENp8qC38wE30mEZOoC6KwCMOqE3fbE6DZEZHZEJSwCpbbCZevC65aNsCoDZ0nEMOuDJ4vDpGuDJKvCMLaOp0nDcGvPcKrDZKoNpDZDZ4qC38rOZSuCJ8qDJ5bD6DaEJSpPZKpPZXcOMKv`;
                // const defaultMediaUrl = `https://s2-e1.etcbba.xyz/ppot/_definst_/mp4:s17/live/cr-tmezj-01-0286DA393.mp4/chunklist.m3u8?vendtime=1748570308&vhash=hnkVvWYmtKw9qnGp9h-a7UVl-xvRYpIyzaYqA7HdefE=&vCustomParameter=0_0.0.0.0_VN_1_0&lb=72250729878514654aedf8c305cda459&us=1&proxy=Sp8jPJ4kPNHZOc9XBdXvUdnpCYrbCIvbT6DYOc8kU7bwV7CoBMKnBcLqOs9YOovuUNfyEPaMifYNCheniJ4o5pmyNfyEPaMifYNCheniJ4obpmyNA&vv=${defaultVv}&pub=${defaultPub}`
                const defaultMediaUrl = `https://s2-e1.tfboyaae.com/ppot/_definst_/mp4:s17/gvod/cr-xajqsn-01-0198D5D0C.mp4/chunklist.m3u8?vendtime=1750040762&vhash=SdFZm5ezMe_eg44FeJoDR3A0D5AauUR9aA1L5BeIW4Y=&vCustomParameter=0_0.0.0.0_VN_1_0&lb=1b37e09092ec24a3f8f171090f9bc962&us=1&proxy=Sp8jPJ4kT6PYRtbXOMKkOsyslZcP5hAObpAwCR4nC9Sy7bwV7CoBMKnBcLqOs9YOYvuUNfyEPaMifYNCheniJ4nbpmyNfyEPaMifYNCheniJ4o5pmyNA&vv=2bc5d26f7191c8febc7a671c4e8549b5&pub=CJSqEJWsDpasCIunDp0sDbyh9ozCZGmCZeuC30wDZ8mPJepDZ5YEZGuDJCwEMGnD3fYCJGqEZ9cPJ1VOJ0rOZLZE3OsOcHaD34oCs4rPZGqPJTYD65bEMLXOpXVDcOrPJXYPZSnDZ4pCZLZPZLXPJTbC3asEMHbE6HaDs6`;

                let endUrl = pathname == routes.watch ? mediaUrl : defaultMediaUrl;
                const videoUrl = `/api/proxy?type=previewVideo&url=${encodeURIComponent(endUrl)}`;
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(videoUrl);
                    hls.attachMedia(videoRef.current);

                    //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    //     videoRef.current.play();
                    //     setIsPlaying(true);
                    //   });

                    return () => hls.destroy();
                } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                    videoRef.current.src = videoUrl;
                }
            }
        }
        getVideoSource()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFloatingVideo(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragPercent, duration]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateBuffer = () => {
            if (video.buffered.length > 0) {
                const end = video.buffered.end(video.buffered.length - 1);
                setBuffered(end);
            }
        };

        video.addEventListener('progress', updateBuffer);
        return () => video.removeEventListener('progress', updateBuffer);
    }, []);

    return (
        <div className="wrapper-video" ref={containerRef}>
            <div className="video-screen-outermost">
                <div className="wrap-video-screen" style={{ aspectRatio: currentRatio }}>
                    <VideoScreen
                        isPlay={isPlaying}
                        soundValue={soundValue}
                        videoRef={videoRef}
                        onPlay={() => setIsPlaying(!isPlaying)}
                        isFloatingVideo={isFloatingVideo}
                        onChangeFloatingVideo={() => setIsFloatingVideo(false)}
                        relatedVideos={relatedVideos}
                        videoDetail={videoDetail}
                        publisher={publisher}
                        onEndVideo={() => setIsPlaying(false)}
                    />
                </div>
            </div>


            <div
                ref={progressBarRef}
                onMouseDown={handleMouseDown}
                className="wrap-progress-video d-flex align-items-center gap-2 mt-2 mb-4"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    const seekTime = percent * duration;

                    videoRef.current.currentTime = seekTime;
                    setCurrentTime(seekTime);
                }}
            >


                <div className="">
                    <div
                        className="buffered-bar"
                        style={{
                            width: `${(buffered / duration) * 100}%`,
                        }}
                    />

                    {/* progress bar */}
                    <div
                        className="progress-bar"
                        style={{
                            width: `${(currentTime / duration) * 100}%`,

                        }}
                    />

                    {/* dot */}
                    <div
                        className="progress-dot"
                        style={{ left: `${(isDragging ? dragPercent : currentTime / duration) * 100}%` }}
                    />

                </div>
            </div>

            <div className="video-option">
                <div className="d-flex gap-5 align-items-center">
                    <div className="d-flex gap-3 align-items-center">
                        <div onClick={togglePlay} className="text-white-hover">
                            {isPlaying ? <ImPause className="btn-play-video" /> : <FaRegPlayCircle className="btn-play-video" />}
                        </div>

                        <span className="fs-5">
                            {formatTime(currentTime)} / {" "}
                            {duration ? formatTime(duration) : "00:00"}
                        </span>
                    </div>
                    <span className="text-white-hover cursor-pointer" onClick={showCollections}>选集</span>
                </div>
                <div className="d-flex gap-5 align-items-center">
                    <CommonDropdown
                        isOpen={isOpenSelectSpeed}
                        toggle={(value) => setIsOpenSelectSpeed(value)}
                    >
                        {[<SpeedButton key="button" />, <SpeedOption key="option" />]}
                    </CommonDropdown>

                    <CommonVolume
                        onSetValue={onSetValue}
                    />

                    <CommonDropdown
                        isOpen={isOpenViewportRatio}
                        toggle={(value) => setIsOpenViewportRatio(value)}
                    >
                        {[<ViewportRatioButton key="button" />, <ViewportRatioOption key="option" />]}
                    </CommonDropdown>

                    <div onClick={toggleFullscreen} className="cursor-pointer text-white-hover">
                        {!isFullscreen ? <MdOutlineZoomOutMap className="fs-3" /> : <MdOutlineZoomInMap className="fs-3" />}
                    </div>
                </div>
            </div>

            <div className="wrap-collections" id="wrap-collections">
                <div className="collections">
                    <div className="collections-content">
                        <div className="">
                            <span className="text-pink">1</span>
                            <Image alt='runing' src={"/collections-playing.gif"} width={15} height={12} />
                        </div>
                        <div className="">
                            <span className="text-main-gray">2</span>
                        </div>
                    </div>
                    <div className="collections-trigger" onClick={hideCollections}>
                        <div className="position-relative">

                            <Image alt='trigger' src={"/collections-trigger.png"} width={18} height={85} />
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
