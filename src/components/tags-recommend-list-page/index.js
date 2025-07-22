"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useState } from "react";
import _ from 'lodash-es';
import { getMainMenus, getTagFilter } from "@/apis/homepage";
import { useQuery } from "react-query";
import { usePathname, useSearchParams } from "next/navigation";


export const TagsRecommendListPage = (props) => {
    const { title = '' } = props;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    let isRecommended = searchParams.get("isRecommended");

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            params.delete('page');
            return params.toString();
        },
        [searchParams]
    );

    //   const deleteQueryString = useCallback(
    //     (name, value) => {
    //       const params = new URLSearchParams(searchParams.toString());
    //       params.delete(name, value);

    //       return params.toString();
    //     },
    //     [searchParams]
    //   );

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

    return (
        <div className="tags-homepage d-flex flex-column flex-md-row justify-content-start mb-4 gap-md-2 gap-4">
            <div className="tags-homepage-left-3">
                <CListGroup layout="horizontal" className="flex-wrap">
                    <CListGroupItem
                        key="-1"
                        className={
                            excluded.includes(isRecommended) || isRecommended == `-1` ? "recommended-active item-recommended-default" : "item-recommended-default"
                        }
                    >
                        <Link href={
                            pathname + "?" + createQueryString("isRecommended", `-1`)
                        }
                            className="text-white">
                            <small className='text-white-hover' >全部推荐</small>
                        </Link>
                    </CListGroupItem>
                </CListGroup>
            </div>

            <div className="tags-homepage-center-3 ">
                <CListGroup layout="horizontal" className="flex-wrap">
                    <CListGroupItem key="1"
                        className={
                            isRecommended == `1` ? "recommended-active item-recommended-default" : "item-recommended-default"
                        }
                    >
                        <Link href={pathname + "?" + createQueryString("isRecommended", `1`)} className="text-white">
                            <span className='text-white-hover'>是</span>
                        </Link>
                    </CListGroupItem>
                    <CListGroupItem key="0" className={
                        isRecommended == `0` ? "recommended-active item-recommended-default" : "item-recommended-default"
                    }
                    >
                        <Link href={pathname + "?" + createQueryString("isRecommended", `0`)} className="text-white">
                            <span className='text-white-hover'>否</span>
                        </Link>
                    </CListGroupItem>
                </CListGroup>
            </div>
        </div>

    )
}
