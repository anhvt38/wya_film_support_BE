"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { getConvertedQuery, textColorByOrder } from "@/utils/common";
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
import { useParams, useSearchParams } from "next/navigation";
import qs from "qs";

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
    const searchParams = useSearchParams()
    const tag = searchParams.get('tag');
    const label = searchParams.get('label');
    const cid = searchParams.get('cid');
    const orderBy = searchParams.get('orderBy');
    const asc = searchParams.get('asc');

    const cinema3 = !cid || cid == DEFAULT_CID.svideo || cid == DEFAULT_CID.gay;
    const cinema2 = !cid || cid == DEFAULT_CID.japanCid || cid == DEFAULT_CID.europeCid || cid == DEFAULT_CID.cartoonCid || cid == DEFAULT_CID.domesticCid;
    const { partSearchTotal, setPartSearchTotal, setSearchDataTotal, publicKey, privateKey } = useContext(MainContext);

    const [tagFilterParams, setTagFilterParams] = useState({
    })

    const [briefSearchParams, setBriefSearchParams] = useState({
        cinema: 2,
        tags: decodeKeyword,
        page: 1,
        size: 36,
        isserial: -1
    })

    const [briefSearchBody, setBriefSearchBody] = useState({
        tags: decodeKeyword,
    })

    const [briefSearchVideoParams, setBriefSearchVideoParams] = useState({
        cinema: 3,
        tags: decodeKeyword,
        page: 1,
        size: 35,
        isserial: -1,
        isav: true,
        cid: `0,3`,
        label: tag
    })

    const [briefSearchVideoBody, setBriefSearchVideoBody] = useState({
        tags: decodeKeyword,
    })


    const { data: tagFilterDatas } = useQuery({
            queryKey: ["tag-filter", tagFilterParams, publicKey, privateKey, label],
            queryFn: () => {
                let paramsQuery = qs.stringify(tagFilterParams);
          if (label == null || label == undefined || label == '') {
    
          } else {
            paramsQuery = paramsQuery + `cid=` + label;
          }
          let paramsSignQuery = getConvertedQuery(paramsQuery);
          paramsSignQuery = `${paramsSignQuery}&cid=${label}`;
          paramsSignQuery = paramsSignQuery.replace("&vv", 'vv');
                return getTagFilter(paramsSignQuery);
            },
            enabled: !!publicKey
        });

    const { data: briefSearchDatas } = useQuery({
        queryKey: ["brief-search", briefSearchBody, briefSearchParams, publicKey, privateKey, cid, tag, orderBy, asc],
        queryFn: () => {
            return getBriefSearch({
                ...briefSearchBody,
                vv: privateKey,
                pub: publicKey
            }, {
                ...briefSearchParams,
                orderBy: orderBy || 4,
                desc: asc ? 0 : 1,
                cid,
                label: tag
            });
        },
        enabled: !!publicKey && !!privateKey && cinema2
    });

    const { data: briefSearchVideoDatas } = useQuery({
        queryKey: ["brief-search-video", privateKey, publicKey, label, tag, cid, orderBy, asc],
        queryFn: () => {
            return getBriefSearch({
                ...briefSearchVideoBody,
                vv: privateKey,
                pub: publicKey
            }, {
                ...briefSearchVideoParams,
                orderBy: orderBy || 4,
                desc: asc ? 0 : 1,
                label: cid == DEFAULT_CID.gay ? label : tag
            });
        },
        enabled: !!publicKey && !!privateKey && cinema3
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
            {
                cid &&
                <AllTags datas={tagFilters?.info} />
            }
            <div className="search-video-content">
                {
                    (!briefSearchs?.info[0]?.hasResult && !briefSearchVideos?.info[0]?.hasResult)
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