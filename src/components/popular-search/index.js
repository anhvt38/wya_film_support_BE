"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useState } from "react";
import { getHotSearchList } from "@/apis/search";
import { useQuery } from "react-query";
import _ from "lodash-es";
import { textColorByOrder } from "@/utils/common";

export const PopularSearch = () => {
    const [params, setParams] = useState({
        cinema: 2,
        size: 10,
        cacheable: 1
    })

    const { data: hotSearchListDatas }
        = useQuery({
            queryKey: ['hot-search-list'],
            queryFn: () => {
                return getHotSearchList({
                    ...params
                })
            },
        })

    const { data: hotSearchList } = hotSearchListDatas || {};
    const popularHotSearchList = hotSearchList?.info[0];
    const myHotSearchList = hotSearchList?.info[1];

    return (
        <div className="popular-search w-full">
            <div className="mb-3">
                <div className="py-2 px-2 d-flex justify-content-between">你的搜索
                    <span className="delete-history-search">擦除</span>
                </div>

                <CListGroup>
                    {
                        _.map(myHotSearchList?.slice(0, 5), (item, index) => {
                            return (
                                <CListGroupItem key={index}>
                                    <Link href="#" className="text-white d-block w-full py-1 px-3">{item.title}</Link>
                                </CListGroupItem>
                            )
                        })
                    }


                </CListGroup>
            </div>

            <div>
                <div className="py-2 px-2">热门搜索：</div>

                <CListGroup>
                    {
                        _.map(popularHotSearchList?.slice(0, 5), (item, index) => {
                            return (

                                <CListGroupItem key={index}>
                                    <Link href="#" className="d-flex gap-3 align-items-center py-1 px-3">
                                        <strong className={`order-text fw-bold fs-4 ${textColorByOrder(index)}`}>{index + 1}</strong>
                                        <small className="text-white m-0">{item.title}</small>
                                    </Link>
                                </CListGroupItem>
                            )
                        })
                    }

                </CListGroup>
            </div>
        </div>

    )
}
