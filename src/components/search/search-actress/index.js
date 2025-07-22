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
import { useParams } from "next/navigation";
import EmptySearchResult from "../empty-search-result";

export default function SearchActress({ watchRoute = true, paramId }) {
    const { partSearchTotal, setPartSearchTotal, setSearchDataTotal } = useContext(MainContext);
    const params = useParams();
    const decodeKeyword = decodeURIComponent(params.keyword);

    const [briefSearchParams, setBriefSearchParams] = useState({
        cinema: 2,
        tags: "希岛爱理",
        star: "希岛爱理",
        orderby: 4,
        page: 1,
        size: 36,
        desc: 0,
        isserial: -1
    })

    const [briefSearchBody, setBriefSearchBody] = useState({
        tags: "%E5%B8%8C%E5%B2%9B%E7%88%B1%E7%90%86",
        vv: "e2107455caf23d8d45fcc1cb141e890d",
        pub: "1751249109868"
    })

    const [briefSearchVideoStarParams, setBriefSearchVideoStarParams] = useState({
        cinema: 3,
        tags: "希岛爱理",
        star: "希岛爱理",
        orderby: 4,
        page: 1,
        size: 36,
        desc: 0,
        isserial: -1,
        isav: true,
        cid: `0,3`
    })

    const [briefSearchVideoStarBody, setBriefSearchVideoStarBody] = useState({
        tags: "希岛爱理",
        vv: "b9843f649a639997d7485a389509825f",
        pub: "CJSrCJ8rC30mCouvCZOtDryh9ozCZGmCZeuC30wDZ8mPJfXOp4wD3KoEJenOs9YEZSmC3KwP65VE6GtPMCqP35aCc9aD30rOpbcC3LaOJGmOZHZPMLbPJ1VDp0sP3CmDZOrD6OsDpasD64rE3OuOZXXDZ8pP3CoCZ2"
    })

    const { data: briefSearchStarDatas } = useQuery({
        queryKey: ["brief-search-star"],
        queryFn: () => {
            return getBriefSearch(briefSearchBody, briefSearchParams);
        },
    });

    const { data: briefSearchVideoStarDatas } = useQuery({
        queryKey: ["brief-search-video-star"],
        queryFn: () => {
            return getBriefSearch(briefSearchVideoStarBody, briefSearchVideoStarParams);
        },
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
                (!briefSearchStars?.info[0]?.result && !briefSearchVideoStars?.info[0]?.result)
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