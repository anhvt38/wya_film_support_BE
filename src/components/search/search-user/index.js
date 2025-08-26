"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { textColorByOrder } from "@/utils/common";
import { CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import SearchUserItem from "../search-user-item";
import { useMutation, useQuery } from "react-query";
import { getSearchUser } from "@/apis/search";
import _ from "lodash-es";
import axios from "axios";
import { MainContext } from "@/layouts/MainLayout";
import EmptySearchResult from "../empty-search-result";
import { useParams } from "next/navigation";
import qs from 'qs';

export default function SearchUser({ watchRoute = true, paramId }) {
    const { publicKey, privateKey, partSearchTotal, setPartSearchTotal, setSearchDataTotal } = useContext(MainContext);
    const params = useParams();
    const decodeKeyword = decodeURIComponent(params.keyword);

    const [searchUserParams, setSearchUserParams] = useState({
        cinema: 2,
        orderby: 4,
        page: 1,
        size: 36,
        desc: 1
    })

    const [searchUserBody, setSearchUserBody] = useState({
    })

    const { data: searchUserDatas } = useQuery({
        queryKey: ["search-user", publicKey, privateKey],
        queryFn: async () => {
            const query = qs.stringify(searchUserParams);
            const formBody = new URLSearchParams({
                ...searchUserBody,
                tags: decodeKeyword,
                vv: privateKey,
                pub: publicKey
            }).toString();
            const data = await fetch(`${process.env.HOST_API_RANKV21}/v3/list/searchUser?${query}`, {
                method: "POST",
                body: formBody,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })

            return await data.json();
        },
        enabled: !!publicKey && !!privateKey
    });

    const { data: searchUsers } = searchUserDatas || {};

    useEffect(() => {
        const total = searchUsers?.info[0]?.recordNum;
        setSearchDataTotal(total)
        setPartSearchTotal({
            ...partSearchTotal,
            userTotal: total
        })
    }, [searchUsers])


    return (
        <div className="search-user">
            {
                searchUsers?.info[0]?.list
                ? _.map(searchUsers?.info[0]?.list, (item, index) => {
                    return (
                        <SearchUserItem key={index} item={item} keyword={decodeKeyword} />
                    )
                })
                : <EmptySearchResult text={`没有找到${decodeKeyword}相关的用户`} keyword={decodeKeyword} />
            }
            
        </div>
    )
}