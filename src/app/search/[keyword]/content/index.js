"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { pushParamToURl, textColorByOrder } from "@/utils/common";
import { CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import SearchVideo from "@/components/search/search-video";
import SearchActress from "@/components/search/search-actress";
import SearchUser from "@/components/search/search-user";
import SearchAlbum from "@/components/search/search-album";
import SearchActivity from "@/components/search/search-activity";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MAIN_TYPES } from "@/contants/variables";
import { getHotSearchList } from "@/apis/search";
import { useQuery } from "react-query";
import _ from "lodash-es";
import { MainContext } from "@/layouts/MainLayout";
import { CommonPagination } from "@/components/common-pagination";

let LIMIT_ITEM_DEFAULT_A_PAGE = 36;

export default function Search({ watchRoute = true, paramId }) {
    const searchParams = useSearchParams()
    const params = useParams();
    const router = useRouter();
    const type = searchParams.get('type')
    const orderbyParam = searchParams.get('orderBy')
    const currentPage = Number(searchParams.get("page") || 1);
    const decodeKeyword = decodeURIComponent(params.keyword);

    const { partSearchTotal, searchDataTotal } = useContext(MainContext);
    const paramsObject = Object.fromEntries(searchParams.entries());

    const [orderBy, setOrderBy] = useState('')
    const [asc, setAsc] = useState('')

    const [hotSearchParams, setHotSearchParams] = useState({
        cinema: 2,
        size: 10,
        cacheable: 1
    })

    const { data: hotSearchListDatas }
        = useQuery({
            queryKey: ['hot-search-list'],
            queryFn: () => {
                return getHotSearchList({
                    ...hotSearchParams
                })
            },
        })

    const renderContentType = () => {
        try {
            switch (type) {
                case MAIN_TYPES.star:
                    return <SearchActress />;
                case MAIN_TYPES.user:
                    return <SearchUser />;
                case MAIN_TYPES.album:
                    return <SearchAlbum />;
                case MAIN_TYPES.activity:
                    return <SearchActivity />;

                default:
                    return <SearchVideo />
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const link = pushParamToURl(
            paramsObject, {
            orderBy,
        })
        router.push(link)

    }, [orderBy])

    useEffect(() => {

        const link = pushParamToURl(
            paramsObject, {
            asc: asc ? 1 : 0
        })
        router.push(link)
    }, [asc])

    const { data: hotSearchList } = hotSearchListDatas || {};
    const popularHotSearchList = hotSearchList?.info[0];
    const totalPages = Math.ceil(searchDataTotal / 36);


    return (
        <div className="search-page">
            <div className="search-page-left">
                <div className="search-page-option">
                    <div className="d-flex align-items-center">
                        <div className="options-type">
                            <Link href={`?`} className={`${!type ? "active" : ""} whitespace-nowrap`}>
                                视频
                                <sup>{partSearchTotal.videoTotal || null}</sup>
                            </Link>
                            <Link href={`?type=${MAIN_TYPES.star}`} className={`${type == MAIN_TYPES.star ? "active" : ""} whitespace-nowrap`}>
                                女优
                                <sup>{partSearchTotal.actressTotal || null}</sup>
                            </Link>
                            <Link href={`?type=${MAIN_TYPES.user}`} className={`${type == MAIN_TYPES.user ? "active" : ""} whitespace-nowrap`}>
                                用户
                                <sup>{partSearchTotal.userTotal || null}</sup>
                            </Link>
                            <Link href={`?type=${MAIN_TYPES.album}`} className={`${type == MAIN_TYPES.album ? "active" : ""} whitespace-nowrap`}>
                                相册
                                <sup>{partSearchTotal.albumTotal || null}</sup>
                            </Link>
                            <Link href={`?type=${MAIN_TYPES.activity}`} className={`${type == MAIN_TYPES.activity ? "active" : ""} whitespace-nowrap`}>
                                动态
                                <sup>{partSearchTotal.activityTotal || null}</sup>
                            </Link>
                        </div>
                        <div className="search-page-gap"></div>
                        <div className="searching-key">
                            <span>{decodeKeyword}</span>
                            <IoClose />
                        </div>
                        <span className="text-main-gray"> 共有 <label className="text-white">{searchDataTotal}</label> 个搜索结果 </span>

                    </div>
                    {
                        (!type || type == MAIN_TYPES.star) &&
                        <div className="search-page-sort">
                        <div className={!orderbyParam ? "active" : ""} onClick={() => {
                            setOrderBy("")
                            if (orderbyParam == "") {
                                setAsc(!asc)
                            }
                        }}>
                            <div className=" d-flex align-items-center gap-1">
                                <span>匹配程度</span>
                                {
                                    !orderbyParam &&
                                    (
                                        asc
                                            ? <LiaSortAmountUpAltSolid />
                                            : <LiaSortAmountDownSolid />
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className={orderbyParam == 0 ? "active" : ""}
                            onClick={() => {
                                setOrderBy("0")
                                if (orderbyParam == 0) {
                                    setAsc(!asc)
                                }
                            }}>
                            <div className=" d-flex align-items-center gap-1">
                                <span>添加时间</span>
                                {
                                    orderbyParam == 0 &&
                                    (
                                        asc
                                            ? <LiaSortAmountUpAltSolid />
                                            : <LiaSortAmountDownSolid />
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className={orderbyParam == 1 ? "active" : ""}
                            onClick={() => {
                                setOrderBy(1)
                                if (orderbyParam == 1) {
                                    setAsc(!asc)

                                }
                            }}>
                            <div className=" d-flex align-items-center gap-1">
                                <span>人气高低</span>
                                {
                                    orderbyParam == 1 &&
                                    (
                                        asc
                                            ? <LiaSortAmountUpAltSolid />
                                            : <LiaSortAmountDownSolid />
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className={orderbyParam == 2 ? "active" : ""}
                            onClick={() => {
                                setOrderBy(2)
                                if (orderbyParam == 2) {
                                    setAsc(!asc)
                                }
                            }}>
                            <div className=" d-flex align-items-center gap-1">
                                <span>评分高低</span>
                                {
                                    orderbyParam == 2 &&
                                    (
                                        asc
                                            ? <LiaSortAmountUpAltSolid />
                                            : <LiaSortAmountDownSolid />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    }
                    
                </div>
                {renderContentType()}

                <div className="mb-5 pagination-search page-control">
                    {totalPages > 1 && (
                        <CommonPagination
                            recordcount={searchDataTotal}
                            limitItemInPage={LIMIT_ITEM_DEFAULT_A_PAGE}
                            currentPageDefault={currentPage}></CommonPagination>
                    )}
                </div>
            </div>

            <div className="search-page-right">
                <Link href="/">
                    <Image className="thumbnail-ads-search" alt='ads' src="/ads-auth.jpg" width={0} height={0} sizes="100vw" />
                </Link>
                <div className="popular-list">
                    <h3>热门搜索</h3>
                    <CListGroup layout="vertical" >
                        {
                            _.map(popularHotSearchList?.slice(0, 9), (item, index) => {
                                return (
                                    <CListGroupItem key={index} className="text-pink-hover white-space-nowrap cursor-pointer fs-5">
                                        <span className={`${textColorByOrder(index)} me-4`}>{index + 1}</span>
                                        <Link href="/" className="text-pink-hover text-color-main">
                                            {item.title}
                                        </Link>
                                    </CListGroupItem>
                                )
                            })
                        }
                    </CListGroup>
                </div>
            </div>
        </div>
    )
}