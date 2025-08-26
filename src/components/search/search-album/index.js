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
import SearchAlbumLabel from "../search-album-label";
import EmptySearchResult from "../empty-search-result";
import { useQuery } from "react-query";
import { getLabels, getSearchAlbum } from "@/apis/search";
import { MainContext } from "@/layouts/MainLayout";
import { useParams, useSearchParams } from "next/navigation";
import SearchAlbumItem from "../search-album-item";
import qs from 'qs';
import _ from "lodash-es";

export default function SearchAlbum(props) {
    const { } = props || {};
    const { privateKey, publicKey, } = useContext(MainContext);
    const params = useParams();
    const decodeKeyword = decodeURIComponent(params.keyword);
    const searchParams = useSearchParams()
    const label = searchParams.get('label')

    const [labelParams, setLabelParams] = useState({
        cinema: 2,
    })

    const [searchAlbumParams, setSearchAlbumParams] = useState({
        page: 1,
        size: 32,
        photoType: 0
    })

    const [searchAlbumBody, setSearchAlbumBody] = useState({
    })


    const { data: labelDatas } = useQuery({
        queryKey: ["labels", labelParams],
        queryFn: () => {
            const convertedQuery = getConvertedQuery(labelParams, publicKey, privateKey)
            return getLabels(convertedQuery);
        },
        enabled: !!publicKey
    });

    const { data: searchAlbumDatas } = useQuery({
        queryKey: ["search-album", searchAlbumBody, label],
        queryFn: async () => {
            const query = qs.stringify(searchAlbumParams);
            const formBody = new URLSearchParams({
                ...searchAlbumBody,
                tags: label || "全部",
                key: decodeKeyword,
                vv: privateKey,
                pub: publicKey
            }).toString();
            const data = await fetch(`${process.env.HOST_API_API8}/v3/album/SearchAlbum?${query}`, {
                method: "POST",
                body: formBody,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })

            return await data.json();
        },
    });

    const { data: labels } = labelDatas || {};
    const { data: searchAlbums } = searchAlbumDatas || {};

    return (
        <div className="search-album">
            <SearchAlbumLabel datas={labels?.info} />
            <div className="search-album-content">
                {
                    searchAlbums?.info[0]?.list.length
                    ? _.map(searchAlbums?.info[0]?.list, (item, index) => {
                        return(
                            <SearchAlbumItem key={index} item={item} />
                        )
                    })
                    : <EmptySearchResult text={`没有找到${decodeKeyword}相关的相册`} keyword={decodeKeyword} />
                }
            </div>
        </div>
    )
}