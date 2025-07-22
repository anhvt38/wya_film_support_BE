"use client"

import React, { useEffect, useRef, useState } from 'react';
import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { getFlagSrcByModelCountry, getMediaPlaylistUrl } from "@/utils/common";
import Hls from 'hls.js';
import "./styles.scss";

export default function HLSVideoPreview(props) {
    const { item, children } = props || {};
    const { title, snapshotUrl, streamUrl, userName, previewUrlThumbSmall, viewersCount, clickUrl, modelsCountry } = item || {};
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const isHoveringRef = useRef(false);

    const [isShowThumbnail, setIsShowThumbnail] = useState(true);

    const handleMouseEnter = async () => {
        setIsShowThumbnail(false)
        isHoveringRef.current = true;
        const mediaUrl = await getMediaPlaylistUrl(streamUrl);
        if (!isHoveringRef.current || !videoRef.current) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(mediaUrl);
            hls.attachMedia(videoRef.current);
            hlsRef.current = hls;

            const onCanPlay = () => {
                if (isHoveringRef.current) {
                    videoRef.current.play();
                }
            };
            videoRef.current.addEventListener('canplay', onCanPlay, { once: true });


        } else {
            videoRef.current.src = mediaUrl;

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
        <div className="livestream-video-item">
            <Link href={clickUrl}>
                <div className="position-relative overflow-hidden wrap-video-item">
                    <p className="position-absolute livestream-item-title d-flex gap-1 align-items-center justify-content-start w-full top-0 px-2 pt-3 truncate-one-line">
                        <Image
                            alt='live-ic'
                            src="/wy-live.png"
                            width={30}
                            height={15}
                        />
                        {title}
                    </p>
                    {
                        isShowThumbnail && !isHoveringRef.current
                            ? 
                            <Image
                                alt=''
                                src={snapshotUrl}
                                width={0}
                                height={245}
                                sizes="100vw"
                                className="w-full video-item-thumbnail"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                             : <video
                                ref={videoRef}
                                muted
                                controls={false}
                                preload="none"
                                className=''
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                    }

                    <div className="view-time d-flex justify-content-between align-items-center  position-absolute bottom-0 left-0 px-2 pb-2 pt-3 w-full">

                        <div className=" d-flex justify-content-start gap-2 align-items-end ">
                            <div className="livestream-avatar">
                                <Image
                                    alt={'avatar'}
                                    src={previewUrlThumbSmall}
                                    width={35}
                                    height={35}
                                    className="rounded-full"
                                />
                                <div className="livestream-dot"></div>
                            </div>
                            <p>{userName}</p>
                        </div>
                        {!!getFlagSrcByModelCountry(modelsCountry) &&
                            <div className="text-white">
                                <Image
                                    alt={modelsCountry}
                                    src={getFlagSrcByModelCountry(modelsCountry)}
                                    width={30}
                                    height={20}
                                />
                            </div>
                        }

                    </div>
                </div>
            </Link>
        </div>

    );
};

