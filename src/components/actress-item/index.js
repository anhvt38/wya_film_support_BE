"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { convertHotView } from "@/utils/common";
import { routes } from "@/contants/routes";
import { MAIN_TYPES } from "@/contants/variables";

export const ActressItem = (props) => {
    const { item, title = '', children } = props || {};
    const HOST_LINK_STATIC = process.env.HOST_LINK_STATIC;

    const { hot, name, lastName, workNum, imgPath } = item || {};
    const urlLinkFull = 'https://static.wyav.tv' + imgPath;

    return (
        <div className="actress-item" style={{ maxWidth: "400px" }}>
            <Link href={`${routes.search}/${name}?type=${MAIN_TYPES.star}`}>
                <Image
                    title={name}
                    alt={name}
                    src={urlLinkFull}
                    width={0}
                    height={216}
                    sizes="100vw"
                    className="w-full video-item-thumbnail"
                />
            </Link>
            <div className="bg-main-gray px-2 py-3">
                <Link href={`${routes.search}/${name}?type=${MAIN_TYPES.star}`} className=" truncate-one-line text-pink-hover">{name}</Link>
                <div className="d-flex justify-content-between align-items-end flex-wrap mt-2">
                    <div className="whitespace-nowrap text-main-gray">
                        <small>作品数: {workNum}</small>

                    </div>
                    <div className="text-end">
                        <FaFireFlameCurved className="text-danger ms-1" />
                        <small className="whitespace-nowrap text-main-gray ms-2">{convertHotView(hot)}</small>

                    </div>
                </div>
            </div>
        </div>
    )
}
