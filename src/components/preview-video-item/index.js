"use client"

import React, { useEffect, useRef } from 'react';
import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { getFlagSrcByModelCountry } from "@/utils/common";
import Hls from 'hls.js';
import "./styles.scss";

export default function PreviewVideoItem({src}) {

    const videoRef = useRef(null);
    
    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);

            return () => {
                hls.destroy();
            };
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
        }
    }, [src]);

    const handleMouseEnter = () => {
        videoRef.current?.play();
    };

    const handleMouseLeave = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
    };

    return (
        <video
                        ref={videoRef}
                        muted
                        controls={false}
                        preload="metadata"
                        className=''
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />

    );
};

