"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useState } from "react";
import _ from 'lodash-es';
import { getMainMenus, getTagFilter } from "@/apis/homepage";
import { useQuery } from "react-query";
import { usePathname, useSearchParams } from "next/navigation";


export const TagsAllClassesListPage = (props) => {
    const { title = '' } = props;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    let isMasaike = searchParams.get("isMasaike");

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            params.delete('page');
            return params.toString();
        },
        [searchParams]
    );

    // const [params, setParams] = useState({
    //     cinema: 2,
    //     cid: "0,2,10",
    //     vv: "6e0e0d0fff56447dd1c8b456b076cf54",
    //     pub: "CJSqD3aqDZGmDYuoCp8tDrya9QzCJOtBZ4tEIurD2uoDJDVOZHaCJ0sEMCrEM9bD6GvOJavCJSrPZ1XOcPZD3CrOJ9VPZKpEM9aCsGqPM8tPc5ZPMCvE6OpP3KmCcDXPJ1cCZ4"
    // })

    // const [tagFilterParams, setAllTypeParams] = useState({
    //     cid: "svideo",
    //     vv: "b7b1792f83a7b4406178fc8ee8321d62",
    //     pub: "1745667888581"
    // })

    // const { data: mainMenuDatas, isLoading }
    //     = useQuery({
    //         queryKey: ['main-menus'],
    //         queryFn: () => {
    //             return getMainMenus({
    //                 ...params
    //             })
    //         },
    //     })

    // const { data: tagFilterDatas }
    //     = useQuery({
    //         queryKey: ['tag-filter'],
    //         queryFn: () => {
    //             return getTagFilter({
    //                 ...tagFilterParams
    //             })
    //         },
    //     })

    // const { data: tagFilters } = tagFilterDatas || {};

    // const allTags = tagFilters?.info;
    const excluded = [null, undefined, ''];

    // console.log(allTags, 'allTags')
    return (
        <div className="tags-homepage d-flex flex-column flex-md-row justify-content-start my-4 gap-md-2 gap-4">
            <div className="tags-homepage-left-4">
                <CListGroup layout="horizontal" className="flex-wrap">
                    <CListGroupItem
                        key="-1"
                        className={
                            excluded.includes(isMasaike) || isMasaike == `-1` ? "masaike-active item-masaike-default" : "item-masaike-default"
                        }
                    >
                        <Link href={
                            pathname + "?" + createQueryString("isMasaike", `-1`)
                        }
                            className="text-white">
                            <small className='text-white-hover' >全部兵种</small>
                        </Link>
                    </CListGroupItem>
                </CListGroup>
            </div>

            <div className="tags-homepage-center-4">
                <CListGroup layout="horizontal" className="flex-wrap">
                    <CListGroupItem key="1"
                        className={
                            isMasaike == `1` ? "masaike-active item-masaike-default" : "item-masaike-default"
                        }
                    >
                        <Link href={
                            pathname + "?" + createQueryString("isMasaike", `1`)
                        }
                            className="text-white">
                            <span className='text-white-hover'>骑兵</span>
                        </Link>
                    </CListGroupItem>
                    <CListGroupItem key="0"
                        className={
                            isMasaike == `0` ? "masaike-active item-masaike-default" : "item-masaike-default"
                        }
                    >
                        <Link href={
                            pathname + "?" + createQueryString("isMasaike", `0`)
                        }
                            className="text-white">
                            <span className='text-white-hover'>步兵</span>
                        </Link>
                    </CListGroupItem>
                </CListGroup>
            </div>
        </div>

    )
}
