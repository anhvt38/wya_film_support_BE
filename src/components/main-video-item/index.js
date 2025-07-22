"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import _ from "lodash-es";
import { convertHotView } from "@/utils/common";
import { TbZoomScan } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { routes } from "@/contants/routes";

export const MainVideoItem = (props) => {
    const { item, children } = props || {};
    const { key, image, title, tags, hot, view, labels, starring, charge, sNo, updates } = item || {};
    const arrLabels = labels?.split(',');

    
    return (
        <div title={title} className="main-video-item" style={{ maxWidth: "400px" }}>
            <Link href={`${routes.play}/${key}`} className="wrap-main-video position-relative">
                {
                    !!charge &&
                    <Image
                        alt='vip'
                        src={"/wy-vip-label.png"}
                        width={30}
                        height={35}
                        className="position-absolute z-index-50 top-0 start-0"
                    />
                }

                {
                    !!charge && !updates &&
                    <Image
                        alt='vip'
                        src={"/wy-limit-free.png"}
                        width={47}
                        height={25}
                        className="position-absolute z-index-50 top-0 end-0"
                    />
                }

                {
                    !!updates && !charge &&
                    <span className="updates-num bg-red text-white">{updates}</span>
                }

                

                <div className="position-relative overflow-hidden">
                    <Image
                        alt=''
                        src={image}
                        width={0}
                        height={310}
                        sizes="100vw"
                        className="w-full video-item-thumbnail"
                    />

                    

                    <div className="view-time d-flex justify-content-end position-absolute w-full bottom-0 px-2 pb-2 pt-3">
                        <div className="">
                            <IoEyeOutline />
                            <small className="ms-1">{convertHotView(hot || view)}</small>
                        </div>
                    </div>
                    <div className="position-absolute h-full w-full video-deep-info">
                        <div className="d-flex justify-content-center align-items-center">
                            <FaRegPlayCircle className="fs-1" />

                        </div>
                        <div className="bg-main-gray p-2">
                            <Link href={`${routes.play}/${key}`}>
                                <h5 className="truncate-one-line text-pink-hover text-white fw-bold">{title}</h5>

                            </Link>
                            <div className="tags-video">
                                {
                                    _.map(arrLabels, (tag, i) => {
                                        return (
                                            <small key={i} className="text-center white-space-nowwrap truncate-one-line">{tag}</small>
                                        )
                                    })
                                }
                            </div>
                            <div className="my-2 truncate-one-line">
                                <small className="text-white">演员: </small>
                                <small>{starring !== "" ? starring?.replaceAll(',', ' / ') : '匿名的'}</small>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-1 fs-5">
                                <FaFireFlameCurved className="text-danger" />
                                <span className=" ms-1">{convertHotView(hot || view)}</span>
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div className="hover-video-option">
                        <div>
                            <TbZoomScan title="Visual Search" />
                        </div>
                        <div>
                            <LuSaveAll title="Save to Collection" />
                        </div>
                        <div>
                            <FiMoreHorizontal title="Settings" />
                        </div>
                    </div>
            </Link>
            <div className="item-note-content">
                <Link href={`${routes.play}/${key}`} className="px-2 mb-1 mt-3 truncate-one-line text-white-hover fs-5">{title}</Link>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        {
                            _.map(tags, (tag, i) => {
                                return (
                                    <small className="px-2 d-inline-block text-main-gray fs-6" key={i}>{tag}</small>
                                )
                            })
                        }
                    </div>
                    {
                        !!sNo &&
                        <small className="bg-main-gray text-main-gray px-2 text-center truncate-one-line fs-6">{sNo}</small>
                    }
                </div>
            </div>
        </div>
    )
}
