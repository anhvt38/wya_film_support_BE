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
import EmptySearchResult from "../empty-search-result";
import { useQuery } from "react-query";
import { getLabels, getSearchAlbum } from "@/apis/search";
import { MainContext } from "@/layouts/MainLayout";
import { useParams } from "next/navigation";
import SearchAlbumItem from "../search-album-item";
import qs from 'qs';
import _ from "lodash-es";

export default function SearchAlbum(props) {
    const { } = props || {};
    const { setSearchDataTotal } = useContext(MainContext);
    const params = useParams();
    const decodeKeyword = decodeURIComponent(params.keyword);


    const [labelParams, setLabelParams] = useState({
        cinema: 2,
        vv: "27559967f0a6a7a2768f2b6b36ac9f12",
        pub: "CJSrCJ8rCZWmCYuqC34qCryh9ozCZGmCZeuC30wDZ8mPJfXOp4wD3KoEJenOs9YEZSmC3KwP65VC3OnOZGsOcHZOsGoD6CnDM4rD3aqD34vE3HYEMCqE3TVOc9cDp0qCcLZC6HbD6GpOJbbDM8sDZamCp8pCM8rPc1"
    })

    const [searchAlbumParams, setSearchAlbumParams] = useState({
        page: 1,
        size: 32,
        photoType: 0
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
        queryKey: ["search-album"],
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

    return (
        <div className="search-album">
            <SearchAlbumLabel datas={labels?.info} />
            <div className="search-album-content">
                {
                    searchAlbums?.info[0]?.list
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