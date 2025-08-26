"use client"

import { CButton, CListGroup, CListGroupItem, CProgress } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoMailSharp, IoMaleFemaleOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { routes } from "@/contants/routes";
import { getSexIcon } from "@/utils/common";

export const AuthorInfoPopup = (props) => {
    const { userViewModel } = props || {};
    const { key, gold, nextLevel, nickName, currentLevel , sex, from} = userViewModel || {};

    return (
        <div className="author-info-popup">
            <div>
                <div className="row-author-info">
                    <div></div>
                    <h5 className="fw-bold truncate-one-line">{nickName}
                        <span className="ms-2 fw-bold">
                            {getSexIcon(sex)}
                        </span>
                    </h5>
                </div>
                <div className=" row-author-info mt-4 mb-3 align-items-center">
                    <div className="d-flex gap-2 align-items-end text-white fw-bold">
                        <span className="fs-4">L.V.</span>
                        <span className="fs-3">{currentLevel}</span>
                    </div>
                    <div className="d-flex align-items-center gap-5">
                        <div className="d-flex gap-2 align-items-center">
                            <div className="author-ic-bg-1"></div>
                            <span className="text-orange-light">{gold}</span>
                        </div>
                        <div className="d-flex gap-2 align-items-center text-color-main">
                            <FaMapMarkerAlt />
                            <span>{from}</span>
                        </div>
                    </div>
                </div>
                <div className="row-author-info ">
                    <span className="text-color-main">{gold}/{nextLevel}</span>
                    <div className="d-flex gap-2 align-items-center">
                        <div className="author-ic-bg-2"></div>
                        <CProgress value={ gold / nextLevel * 100} className="w-full" />
                    </div>
                </div>
            </div>
            <div className="d-flex py-3 px-4 justify-content-between align-items-center">
                <Link href={`${routes.userMessages}/chat?id=${key}`} className="d-flex gap-2 align-items-center text-main-gray text-white-hover fs-6 cursor-pointer">
                    <IoMailSharp className="fs-5" />
                    <span>私信</span>
                </Link>
                <Link href={`${routes.space}/${key}`} className="link-home-profile text-color-main py-2 px-4 text-white-hover">
                    个人主页
                </Link>
            </div>
        </div>

    )
}
