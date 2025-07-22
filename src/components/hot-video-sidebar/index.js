"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import { NewVideoItem } from "../new-video-item";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { MainVideoItem } from "../main-video-item";
import _ from 'lodash-es';
import { MainVideoSkeleton } from "../skeleton/main-video-skeleton";
import { textColorByOrder } from "@/utils/common";
import Image from "next/image";
import { routes } from "@/contants/routes";


export const HotVideoSidebar = (props) => {
    const { data, isLoading, title = '', listLink, ...rest } = props;
    return (
        <div className="hot-video-sidebar">
            <div className="d-flex gap-3 align-items-center">
                    <Image alt='logo' src="/images/logo.png" width={20} height={20} />

                <Link href={listLink}>
                    <h3 className="text-white text-pink-hover m-0 d-inline-block">{title}</h3>
                </Link>
            </div>
            <div className="mt-4 h-full">
                <CListGroup layout="vertical" className="bg-secondary-gray py-3 px-5 w-full rounded-0 h-full justify-content-between">
                    {
                        _.map(data?.slice(0, 9), (item, index) => {
                            const { title, tags, link } = item || {};
                            return (

                                <CListGroupItem key={index} className="w-full d-flex gap-4">
                                    <strong className={`order-text fw-bold fs-3 ${textColorByOrder(index)}`}>{index + 1}</strong>
                                    <div className="flex-1">
                                        <Link title={title} href={`${routes.play}/${link}`} className="text-pink-hover truncate-one-line fs-5">
                                            {title}
                                        </Link>
                                        <div className=" group-tag mt-2">
                                            {
                                                _.map(tags.split(','), (v, i) => {
                                                    return (
                                                        <div title={v} key={i} className="bg-main-gray text-main-gray px-1 text-center truncate-one-line fs-6">{v}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </CListGroupItem>
                            )
                        })
                    }
                </CListGroup>
            </div>
        </div>
    )
}
