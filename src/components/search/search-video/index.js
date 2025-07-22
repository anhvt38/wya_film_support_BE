"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { textColorByOrder } from "@/utils/common";
import { CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import SelectCidVideo from "../select-cid-video";
import AllTags from "../all-tags";
import SearchVideoItem from "../search-video-item";
import SearchJapanItem from "../search-japan-item";
import SearchEuroItem from "../search-euro-item";
import { useQuery } from "react-query";
import { getTagFilter } from "@/apis/homepage";
import { getBriefSearch } from "@/apis/search";
import _ from "lodash-es";
import { DEFAULT_CID } from "@/contants/variables";
import { MainContext } from "@/layouts/MainLayout";
import EmptySearchResult from "../empty-search-result";
import { useParams } from "next/navigation";

const datas = [
    {
        text: " 全部版块  ",
        linkObj: {
            cid: "",
            label: ""
        }
    },
    {
        text: "小视频",
        linkObj: {
            cid: "svideo",
            label: "小视频"
        }
    },
    {
        text: "日本",
        linkObj: {
            cid: "0,2,10,85",
            label: "日本"
        }
    },
    {
        text: "欧美",
        linkObj: {
            cid: "0,2,10,86",
            label: "欧美"
        }
    },
    {
        text: "卡通",
        linkObj: {
            cid: "0,2,10,88",
            label: "卡通"
        }
    },
    {
        text: "国产",
        linkObj: {
            cid: "0,2,10,87",
            label: "国产"
        }
    },
    {
        text: "男同",
        linkObj: {
            cid: "gay",
            label: "男同"
        }
    }
]

export default function SearchVideo(props) {
    const { } = props || {};
    const params = useParams();
    const decodeKeyword = decodeURIComponent(params.keyword);

    const { partSearchTotal, setPartSearchTotal, setSearchDataTotal } = useContext(MainContext);

    const [tagFilterParams, setTagFilterParams] = useState({
        cid: "欧美",
        vv: "b82c202ce17a2201dc232c08c1a6baeb",
        pub: "CJSrCJ8qCZSvCoutCpWuELyh9ozCZGmCZeuC30wDZ8mPJfXOp4wD3KoEJenOs9YEZSmC3KwP65VOM5XOcGoD3TbCsLbD69aC68mC3DbDJ1cP6KuDcDbCcLVCJ9ZE6HZOZGvEJPbCp0pPJWvP3SsDcDZOZDYCp0vDs2"
    })

    const [briefSearchParams, setBriefSearchParams] = useState({
        cinema: 2,
        tags: "希岛爱理",
        orderby: 4,
        page: 1,
        size: 36,
        desc: 0,
        isserial: -1
    })

    const [briefSearchBody, setBriefSearchBody] = useState({
        tags: "%E5%B8%8C%E5%B2%9B%E7%88%B1%E7%90%86",
        vv: "174d28f3b632b0829bd6f194abb71369",
        pub: "CJSrCJ8qDp8nCIunDZWuD5yh9ozCZGmCZeuC30wDZ8mPJfXOp4wD3KoEJenOs9YEZSmC3KwP65VOpamCc8sOsOpPZarD6LZCs5cEJOsCpasDs8mDJXYCJLVCsHaC6KoOMHbOc9bPZSmDpHYD65XD30vOJ8nCZ0nEJ1"
    })

    const [briefSearchVideoParams, setBriefSearchVideoParams] = useState({
        cinema: 3,
        tags: "ok",
        orderby: 4,
        page: 1,
        size: 36,
        desc: 0,
        isserial: -1,
        isav: true,
        cid: `0,3`
    })

    const [briefSearchVideoBody, setBriefSearchVideoBody] = useState({
        tags: "ok",
        vv: "b9843f649a639997d7485a389509825f",
        pub: "CJSrCJ8rC30mCouvCZOtDryh9ozCZGmCZeuC30wDZ8mPJfXOp4wD3KoEJenOs9YEZSmC3KwP65VE6GtPMCqP35aCc9aD30rOpbcC3LaOJGmOZHZPMLbPJ1VDp0sP3CmDZOrD6OsDpasD64rE3OuOZXXDZ8pP3CoCZ2"
    })


    const { data: tagFilterDatas } = useQuery({
        queryKey: ["tag-filter"],
        queryFn: () => {
            return getTagFilter({
                ...tagFilterParams,
            });
        },
    });

    const { data: briefSearchDatas } = useQuery({
        queryKey: ["brief-search"],
        queryFn: () => {
            return getBriefSearch(briefSearchBody, briefSearchParams);
        },
    });

    const { data: briefSearchVideoDatas } = useQuery({
        queryKey: ["brief-search-video"],
        queryFn: () => {
            return getBriefSearch(briefSearchVideoBody, briefSearchVideoParams);
        },
    });

    const { data: tagFilters } = tagFilterDatas || {};
    const { data: briefSearchs } = briefSearchDatas || {};
    const { data: briefSearchVideos } = briefSearchVideoDatas || {};

    useEffect(() => {
        const total = (briefSearchs?.info[0]?.recordcount || 0) + (briefSearchVideos?.info[0]?.recordcount || 0);
        setSearchDataTotal(total)
        setPartSearchTotal({
            ...partSearchTotal,
            videoTotal: total
        })
    }, [briefSearchs, briefSearchVideos])

    return (
        <div className="search-video">
            <SelectCidVideo datas={datas} />
            <AllTags datas={tagFilters?.info} />
            <div className="search-video-content">
                {
                    (!briefSearchs?.info[0]?.result && !briefSearchVideos?.info[0]?.result)
                        ? <EmptySearchResult text={`没有找到${decodeKeyword}相关的视频`} isShowAgainOtherText={true} keyword={decodeKeyword} />
                        : <>
                            {
                                _.map(briefSearchs?.info[0]?.result, (item, index) => {
                                    return (
                                        item.videoClassID == DEFAULT_CID.europeCid
                                            ? <SearchEuroItem key={index} item={item} keyword={decodeKeyword} />
                                            : <SearchJapanItem key={index} item={item} keyword={decodeKeyword} />
                                    )
                                })
                            }

                            {
                                _.map(briefSearchVideos?.info[0]?.result, (item, index) => {
                                    return (
                                        <SearchVideoItem key={index} item={item} keyword={decodeKeyword} />
                                    )
                                })
                            }
                        </>
                }
            </div>
        </div>
    )
}