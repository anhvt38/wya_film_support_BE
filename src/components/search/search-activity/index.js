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
import SearchAlbumLabel from "../search-album-label";
import SearchActivityItem from "../search-activity-item";
import { useQuery } from "react-query";
import { getLabels, getSearchAlbum } from "@/apis/search";
import _ from 'lodash-es';
import { MainContext } from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import EmptySearchResult from "../empty-search-result";
import qs from 'qs';

export default function SearchActivity(props) {
    const { } = props || {};
    const params = useParams();
    const decodeKeyword = decodeURIComponent(params.keyword);

    const { partSearchTotal, setPartSearchTotal, setSearchDataTotal } = useContext(MainContext);

    const [labelParams, setLabelParams] = useState({
        cinema: 2,
        vv: "877e38fbd94abec39c3b6487dc445a0a",
        pub: "1751269452637"
    })

    const [searchAlbumParams, setSearchAlbumParams] = useState({
        page: 1,
        size: 36,
        photoType: 1
    })

    const [searchAlbumBody, setSearchAlbumBody] = useState({
        "tag": "全部",
        "key": "s",
        "vv": "bcdc3746ecf88eeba88f5e4859895bdd",
        "pub": "CJSrCZ0rC3SnE2uoDZOvDLyh9ozCZGmCZeuC30wDZ8mPJfXOp4wCsCoEJeqCM4tEZ8nOcOwDpGrCLyQCnoOiHmRCR6Pd34Q69WR71WQ6fkRcXcR6fmPiHcnCYzPZKsEMKvPJSvDZOuE6HXC3CpCMCvPcOuOc4tP3XaP34"
    })

    const { data: labelDatas } = useQuery({
        queryKey: ["labels"],
        queryFn: () => {
            return getLabels({
                ...labelParams,
            });
        },
    });

    const { data: searchAlbumDatas } = useQuery({
        queryKey: ["search-albums"],
        queryFn: async () => {
            const query = qs.stringify(searchAlbumParams);
            const formBody = new URLSearchParams(searchAlbumBody).toString();
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

    useEffect(() => {
        const total = searchAlbums?.info[0]?.recordCount;
        setSearchDataTotal(total)
        setPartSearchTotal({
            ...partSearchTotal,
            activityTotal: total
        })
    }, [searchAlbums])

    return (
        <div className="search-activity">
            <SearchAlbumLabel datas={labels?.info} />
            <div className="search-activity-content">
                {
                    searchAlbums?.info[0]?.list
                    ? _.map(searchAlbums?.info[0]?.list, (item, index) => {
                        return (
                            <SearchActivityItem key={index} item={item} keyword={decodeKeyword} />
                        )
                    })
                    : <EmptySearchResult text={`没有找到${decodeKeyword}相关的动态`} keyword={decodeKeyword} />
                }
            </div>
        </div>
    )
}