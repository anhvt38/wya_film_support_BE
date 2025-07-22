"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { formatVideoDuration } from "@/utils/time";
import { convertHotView, ensureHttps, getMediaPlaylistUrl } from "@/utils/common";
import { useRef, useState } from "react";
import Hls from "hls.js";
import { routes } from "@/contants/routes";
import { useRouter } from "next/navigation";

export const NewVideoItem = (props) => {
    const { item, children } = props || {};
    const { key, title, image, views, view, avatar, link, playurl, nickName, lastseconds, add_Date } = item || {};

    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const isHoveringRef = useRef(false);
const router = useRouter();
    const [isShowThumbnail, setIsShowThumbnail] = useState(true);

    const handleMouseEnter = async () => {

        setIsShowThumbnail(false)
        isHoveringRef.current = true;
        const previewUrl = `${process.env.HOST_API_PREVIEW_VIDEO}?id=${key}`
        const mediaUrl = await getMediaPlaylistUrl(previewUrl);
        const videoUrl = `/api/proxy?type=previewVideo&url=${encodeURIComponent(mediaUrl)}`;

        if (!isHoveringRef.current || !videoRef.current) return;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(videoRef.current);
            hlsRef.current = hls;

            const onCanPlay = () => {
                if (isHoveringRef.current) {
                    videoRef.current.play();
                }
            };
            videoRef.current.addEventListener('canplay', onCanPlay, { once: true });


        } else {
            videoRef.current.src = videoUrl;

            videoRef.current.addEventListener('canplay', () => {
                if (isHoveringRef.current) {
                    videoRef.current.play();
                }
            }, { once: true });
        }
    };

    const handleMouseLeave = () => {
        isHoveringRef.current = false;
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.removeAttribute('src');
            videoRef.current.load();
        }

        if (hlsRef.current) {
            hlsRef.current.stopLoad();
            hlsRef.current.destroy();
        }

        setIsShowThumbnail(true)

    };

    return (

        <div className="new-video-item" >
            <Link href={`${routes.watch}?v=${key}`}>
                <div className="position-relative overflow-hidden wrap-video-item">
                    {
                        isShowThumbnail && !isHoveringRef.current
                            ? 
                            <Image
                                alt={title}
                                src={image}
                                width={0}
                                height={245}
                                sizes="100vw"
                                className="w-full video-item-thumbnail"
                                // onMouseEnter={handleMouseEnter}
                                // onMouseLeave={handleMouseLeave}
                            />
                            : <video
                                ref={videoRef}
                                muted
                                controls={false}
                                preload="none"
                                className=''
                                // onMouseEnter={handleMouseEnter}
                                // onMouseLeave={handleMouseLeave}
                            />
                    }


                    <div className="view-time d-flex justify-content-between position-absolute w-full bottom-0 px-2 pb-2 pt-3">
                        <div>
                            <FaFireFlameCurved className="text-danger" />
                            <span className="text-white ms-1">{convertHotView(views || view)}</span>
                        </div>
                        <div className="text-white">
                            {formatVideoDuration(lastseconds)}
                        </div>
                    </div>
                </div>
            </Link>
            <div>
                <Link href="/" className="px-2 my-2 truncate-one-line text-pink-hover fs-5">{title}</Link>
                <div className="p-2 d-flex justify-content-between">
                    <div className="d-flex gap-2 align-items-center">
                        <Image alt='avatar' src={ensureHttps(avatar)} width={20} height={20} className="rounded-full overflow-hidden " />
                        <Link title={nickName} href="/" className="text-pink-hover fs-6">{nickName}</Link>
                    </div>
                    <span className="fs-6">{add_Date}</span>
                </div>
            </div>
        </div>
    )
}
