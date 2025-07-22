"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { MdKeyboardDoubleArrowUp, MdOutlineContactSupport } from "react-icons/md";
import { IoDiamondOutline, IoDownload, IoDownloadOutline, IoDownloadSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { PiDeviceMobileSpeakerBold } from "react-icons/pi";
import { routes } from "@/contants/routes";
import { useRouter } from "next/navigation";

export const BottomRightToolbar = () => {
    const router = useRouter();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="bottom-right-toolbar">
            {
                visible &&
                <div>
                    <MdKeyboardDoubleArrowUp onClick={scrollToTop} className="fs-3 cursor-pointer text-white-hover" />
                </div>
            }

            <div className="d-flex flex-column toolbar">

                <div className="">
                    <span className="bg-pink">简体繁体</span>
                    <div className="wrap-icon">
                        <div className="fs-5">简</div>
                    </div>

                </div>
                <div className="">
                    <Link href={routes.appDownload} target="_blank">

                        <span className="bg-pink">下载APP</span>
                        <div className="wrap-icon">
                            <PiDeviceMobileSpeakerBold className="fs-5" />
                            <div>
                                <small className="hot-badge">HOT</small>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="">
                    <span className="bg-pink">升级VIP</span>
                    <div className="wrap-icon">
                        <IoDiamondOutline className="fs-5" />

                    </div>

                </div>
                <div className="">
                    <Link href={routes.helpFaq} target="_blank">
                        <span className="bg-pink">帮助中心</span>
                        <div className="wrap-icon">
                            <MdOutlineContactSupport className="fs-5" />
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}
