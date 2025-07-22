"use client";
import _ from "lodash-es";
import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { BiMessageDots } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { MainContext } from "@/layouts/MainLayout";

export default function DiscoveryActivityItem(props) {
    const { item } = props || {};
    const { setIsOpenAuthModal } = useContext(MainContext);
    const { viewCount, comments, favoriteCount, dd, dateStr, headImg, nickName, description, label, photoAlbumDetailsList } = item;
    const arrlabel = label.split(",");
    const photoAlbumDetailsListShow = photoAlbumDetailsList.slice(0, 4);
    const totalImageNotShow = photoAlbumDetailsList.length - 4;
    return (
        <div className="discovery-activity-item mb-5">
            <div className="discovery-activity-item-top">
                <Link href="/">
                    <Image alt='thumbnail' src={headImg} width={0} height={0} sizes="100vw" />
                </Link>
                <div>
                    <div className="d-flex gap-3 align-items-center">
                        <Link href="/" className="text-white text-pink-hover">
                            <h4 className="m-0">{nickName}</h4>
                        </Link>
                        <button className="fs-5">关注 </button>

                    </div>
                    <div className="mt-3">
                        <span className="text-main-gray fs-5">{dateStr}</span>
                        <span className="text-white fs-5 ms-3">发布了动态</span>
                    </div>
                </div>
            </div>

            <div className="discovery-activity-item-content">
                <p className="mt-3 text-pink fs-5">
                    <span className="text-white">{description}</span>
                </p>
                <div className="activity-item-tags-discovery">
                    {_.map(arrlabel, (itemLabel, index) => {
                        return (
                            <span>{itemLabel}</span>
                        )
                    })
                    }
                </div>

                <div className="activity-item-images-discovery">
                    {_.map(photoAlbumDetailsListShow, (itemLabel, index) => {
                        if (index < 3) {
                            return (
                                <Link href="/" className="">
                                    <Image alt='thumbnail' src={itemLabel.imgPath} width={0} height={0} sizes="100vw" />
                                </Link>
                            )
                        }
                        if (index = 3) {
                            return (
                                <Link href="/" className="">
                                    <Image alt='thumbnail' src={itemLabel.imgPath} width={0} height={0} sizes="100vw" />
                                    {
                                        (totalImageNotShow > 0) &&
                                        <div className="activity-item-overlay">
                                            +{totalImageNotShow}
                                        </div>
                                    }

                                </Link>
                            )
                        }


                    })
                    }
                    {/* <Link href="/" className="">
                        <Image alt='thumbnail' src="/bg-qr-download.png" width={0} height={0} sizes="100vw" />
                    </Link>
                    <Link href="/" className="">
                        <Image alt='thumbnail' src="/bg-qr-download.png" width={0} height={0} sizes="100vw" />
                    </Link>
                    <Link href="/" className="">
                        <Image alt='thumbnail' src="/bg-qr-download.png" width={0} height={0} sizes="100vw" />
                    </Link>
                    <Link href="/" className="">
                        <Image alt='thumbnail' src="/bg-qr-download.png" width={0} height={0} sizes="100vw" />
                    </Link>
                    <Link href="/" className="">
                        <Image alt='thumbnail' src="/bg-qr-download.png" width={0} height={0} sizes="100vw" />
                        <div className="activity-item-overlay">
                            +4
                        </div>
                    </Link> */}
                </div>

                <div className="d-flex gap-5">
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5">
                        <IoEyeOutline />
                        <span>{viewCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover">
                        <BiMessageDots />
                        <span>{comments}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover" onClick={() => setIsOpenAuthModal(true)}>
                        <FaRegStar />
                        <span>{favoriteCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray fs-5 cursor-pointer text-pink-hover" onClick={() => setIsOpenAuthModal(true)}>
                        <AiFillLike />
                        <span>{dd}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}