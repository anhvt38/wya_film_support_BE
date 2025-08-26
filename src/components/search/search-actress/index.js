"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { textColorByOrder } from "@/utils/common";
import { CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import SearchEuroItem from "../search-euro-item";
import { useQuery } from "react-query";
import { getBriefSearch } from "@/apis/search";
import _ from "lodash-es";
import SearchVideoItem from "../search-video-item";
import { MainContext } from "@/layouts/MainLayout";
import { useParams, useSearchParams } from "next/navigation";
import EmptySearchResult from "../empty-search-result";

export default function SearchActress({ watchRoute = true, paramId }) {
    const { privateKey, publicKey, partSearchTotal, setPartSearchTotal, setSearchDataTotal } = useContext(MainContext);
    const params = useParams();
    const decodeKeyword = decodeURIComponent(params.keyword);
    const searchParams = useSearchParams()
    const orderBy = searchParams.get('orderBy');
    const asc = searchParams.get('asc');

    const [briefSearchParams, setBriefSearchParams] = useState({
        cinema: 2,
        page: 1,
        size: 36,
        isserial: -1
    })

    const [briefSearchBody, setBriefSearchBody] = useState({
    })

    const [briefSearchVideoStarParams, setBriefSearchVideoStarParams] = useState({
        cinema: 3,
        page: 1,
        size: 36,
        isserial: -1,
        isav: true,
        cid: `0,3`
    })

    const [briefSearchVideoStarBody, setBriefSearchVideoStarBody] = useState({
    })

    const { data: briefSearchStarDatas } = useQuery({
        queryKey: ["brief-search-star", briefSearchBody, briefSearchParams, orderBy, asc],
        queryFn: () => {
            return getBriefSearch({
                ...briefSearchBody,
                tags: decodeKeyword,
                vv: privateKey,
                pub: publicKey
            }, {
                ...briefSearchParams,
                orderBy: orderBy || 4,
                desc: asc ? 0 : 1,
                tags: decodeKeyword,
                star: decodeKeyword
            });
        },
    });

    const { data: briefSearchVideoStarDatas } = useQuery({
        queryKey: ["brief-search-video-star", briefSearchVideoStarParams, publicKey, privateKey, orderBy, asc],
        queryFn: () => {
            return getBriefSearch({
                ...briefSearchVideoStarBody,
                tags: decodeKeyword,
                vv: privateKey,
                pub: publicKey
            }, {
                ...briefSearchVideoStarParams,
                 orderBy: orderBy || 4,
                desc: asc ? 0 : 1,
                 tags: decodeKeyword,
                star: decodeKeyword
            });
        },
        enabled: !!publicKey && !!privateKey
    });

    const { data: briefSearchStars } = briefSearchStarDatas || {};
    const { data: briefSearchVideoStars } = briefSearchVideoStarDatas || {};

    useEffect(() => {
        const total = (briefSearchStars?.info[0]?.recordcount || 0) + (briefSearchVideoStars?.info[0]?.recordcount || 0);

        setSearchDataTotal(total)
        setPartSearchTotal({
            ...partSearchTotal,
            actressTotal: total
        })
    }, [briefSearchStars, briefSearchVideoStars])

    return (
        <div className="search-actress">
            {
                (!briefSearchStars?.info[0]?.hasResult && !briefSearchVideoStars?.info[0]?.hasResult)
                    ? <EmptySearchResult text={`没有找到${decodeKeyword}相关的视频`} keyword={decodeKeyword} />
                    : <>
                        {
                            _.map(briefSearchStars?.info[0]?.result, (item, index) => {
                                return (
                                    <SearchEuroItem key={index} item={item} keyword={decodeKeyword} />
                                )
                            })
                        }

                        {
                            _.map(briefSearchVideoStars?.info[0]?.result, (item, index) => {
                                return (
                                    <SearchVideoItem key={index} item={item} keyword={decodeKeyword} />
                                )
                            })
                        }
                    </>
            }
        </div>
    )
}