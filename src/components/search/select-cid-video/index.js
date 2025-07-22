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
import { useSearchParams } from "next/navigation";

export default function SelectCidVideo(props) {
    const { datas } = props || {};

    const searchParams = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());
    return (
        <div className="select-cid-video">

            {
                _.map(datas, (item, index) => {
                    const link = pushParamToURl(paramsObject, item.linkObj)
                    const { cid = '' } = paramsObject || {};
                    return (
                        <Link key={index} href={link} className={cid == item.linkObj.cid ? `active` : ""}>
                            <span>{item.text}</span>
                        </Link>
                    )
                })
            }
        </div>
    )
}