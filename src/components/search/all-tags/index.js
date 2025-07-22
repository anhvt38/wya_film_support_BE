"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { pushParamToURl, textColorByOrder } from "@/utils/common";
import { CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import _ from 'lodash-es';
import { useRouter, useSearchParams } from "next/navigation";
import qs from 'qs';

export default function AllTags(props) {
    const { datas } = props || {};

    const searchParams = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    return (
        <div className="all-tags">
            <Link href={pushParamToURl(paramsObject, {tag: ""})} className={!paramsObject.tag ? `active` : ""}>
                <span> 全部喜好 </span>
            </Link>
            <div>
                {
                    _.map(datas, (item, index) => {
                        const link = pushParamToURl(paramsObject, {tag: item.id})
                        return (
                            <Link key={index} href={link} className={paramsObject.tag == item.id ? "active" : ""}>
                                <span>{item.title}</span>
                            </Link>
                        )
                    })
                }
            </div>
            
        </div>
    )
}