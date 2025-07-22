"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { ensureHttps } from "@/utils/common";

export const ListPageItemRow = (props) => {
    const { item, children } = props || {};
    // const HOST_LINK_STATIC = process.env.HOST_LINK_STATIC;

    const { title, image, view, avatar, link, playRecordURL, nickName, add_Date, lastseconds } = item || {};
    let lastsecondsConvert = lastseconds.slice(0, 8);
    let viewConvert = view > 10000 ? `${(view / 10000).toFixed(1)} 萬` : view;
    // const urlLinkFull = 'https://static.wyav.tv' + imgPath;
    const pathName = usePathname();

    // let { orderBy } = router;
    // orderBy = Number(orderBy);
  
    let arrPathName = pathName.split("/");
    // console.log("router ", arrPathName);
    let cid = "svideo";
    let orderBy = 1;
    // console.log("arrPathName[3] ", arrPathName[3]);
    
    return (
        <div className="actress-item" style={{maxWidth: "400px"}}>
        <Link href={`#`}>
        <div className="position-relative overflow-hidden">
            <Image 
                alt='' 
                src={image}
                width={0} 
                height={200} 
                sizes="100vw" 
                className="w-full video-item-thumbnail" 
            />
            <div className="view-time d-flex justify-content-between position-absolute w-full bottom-0 px-2 pb-2 pt-3">
                <div>
                    <FaFireFlameCurved className="text-danger" />
                    <span className="text-white ms-1">{viewConvert}</span>
                </div>
                <div  className="text-white">
                    {lastsecondsConvert}
                </div>
            </div>
        </div>
        </Link>
        <div>
            <Link title={title} href="/" className="px-2 my-2 truncate-one-line text-pink-hover">{title}</Link>
            <div className="p-2 d-flex justify-content-between">
                <div className="d-flex gap-2 align-items-center">
                    <Image alt='avatar' src={ensureHttps(avatar)} width={20} height={20} className="rounded-full overflow-hidden " />
                    <Link title={nickName} href="/" className="text-pink-hover">{nickName}</Link>
                </div>
                <span>{add_Date}</span>
            </div>
        </div>
    </div>
    )
}
