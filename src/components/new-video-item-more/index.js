"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import _ from "lodash-es";

export const NewVideoItemMore = (props) => {
    const { data, children } = props || {};

    return (

        <div className="new-video-item-more " style={{ maxWidth: "400px" }}>
            <Link href="/">
                <div className="list-more-image">
                    {
                        _.map(data, (item, index) => {
                            return(
                                <Image
                                key={index}
                                    alt='查看更多'
                                    src={item.image || "/"}
                                    width={0}
                                    height={120.5}
                                    sizes="100vw"
                                    className="video-item-more"
                                />
                            )
                        })
                    }
                </div>
                <div className="list-more-blur"></div>
                <div className="more-text text-white text-pink-hover w-full h-full">
                    <span>查看更多</span>
                    <MdKeyboardArrowRight />
                </div>
            </Link>
        </div>
    )
}
