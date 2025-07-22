"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegImage, FaRegPlayCircle } from "react-icons/fa";
import { BiLike } from "react-icons/bi";

export const ActressAlbumItem = (props) => {
    const { item, onShowDetail } = props || {};
    const { title, imgPath, photoCount, viewCount, dd } = item || {};

    return (
        <div className="actress-album-item" style={{ maxWidth: "400px" }}>
            <div className="position-relative d-inline-block w-full" onClick={onShowDetail}>
                <Image
                    alt={title}
                    src={imgPath}
                    width={0}
                    height={216}
                    sizes="100vw"
                    className="w-full actress-item-thumbnail objectfit-cover cursor-pointer"
                />
                <div className="position-absolute d-flex gap-1 align-items-center bg-dark text-white rounded px-1 image-total-badge">
                    <FaRegImage />
                    <small>{photoCount}</small>
                </div>
            </div>
            <div className="bg-main-gray p-2 item-actress-info">
                <div title={title} className=" truncate-one-line text-pink-hover text-white cursor-pointer" onClick={onShowDetail}>{title}</div>
                <div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
                    <div className="whitespace-nowrap text-main-gray d-flex gap-1 align-items-center fs-6">
                        <IoEyeOutline className="" />
                        <small>{viewCount}</small>
                    </div>
                    <div className="whitespace-nowrap text-main-gray d-flex gap-1 align-items-center fs-6">
                        <BiLike className="" />
                        <small>{dd}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
