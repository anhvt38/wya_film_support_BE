"use client"

import { CButton, CListGroup, CListGroupItem, CProgress } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoMailSharp, IoMaleFemaleOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

export const AuthorInfoPopup = (props) => {
    const { publisher } = props || {};
    const { title, avatar, hot, gender, from, likes, slogon, videoCount, userLevel } = publisher || {};

    return (
        <div className="author-info-popup">
            <div>
                <div className="row-author-info">
                    <div></div>
                    <h5 className="fw-bold truncate-one-line">{title}<IoMaleFemaleOutline className="text-blue fw-bold ms-2" /></h5>
                </div>
                <div className=" row-author-info mt-4 mb-3 align-items-center">
                    <div className="d-flex gap-2 align-items-end text-white fw-bold">
                        <span className="fs-4">L.V.</span>
                        <span className="fs-3">{userLevel}</span>
                    </div>
                    <div className="d-flex align-items-center gap-5">
                        <div className="d-flex gap-2 align-items-center">
                            <div className="author-ic-bg-1"></div>
                            <span className="text-orange-light">186</span>
                        </div>
                        <div className="d-flex gap-2 align-items-center text-color-main">
                            <FaMapMarkerAlt />
                            <span>{from}</span>
                        </div>
                    </div>
                </div>
                <div className="row-author-info ">
                    <span className="text-color-main">186/200</span>
                    <div className="d-flex gap-2 align-items-center">
                        <div className="author-ic-bg-2"></div>
                        <CProgress value={25} className="w-full" />
                    </div>
                </div>
            </div>
            <div className="d-flex py-3 px-4 justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center text-main-gray text-white-hover fs-6 cursor-pointer">
                    <IoMailSharp />
                    <span>Tin nhắn riêng</span>
                </div>
                <Link href="/" className="link-home-profile text-color-main py-2 px-4 text-white-hover">
                    Trang chủ cá nhân
                </Link>
            </div>
        </div>

    )
}
