"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import _ from "lodash-es";
import { useState } from "react";
import { useQuery } from "react-query";


export const NavigationPopover = () => {
    
        const { data: mainMenuDatas, isLoading }
            = useQuery({
                queryKey: ['header-main-menus'],
                queryFn: async () => {
                    const res = await fetch('/api/proxy');
                    return res.json();
                },
            })
        const { top: topMenus, main: mainMenus } = mainMenuDatas || {};

        return (
        <CListGroup className="navigation-popover flex-wrap">
            {
                _.map(mainMenus, (item, index) => (                                            
                    <CListGroupItem key={index}>
                        <Link 
                        href={Object.keys(item).includes('params') && item?.params !== null && Object.keys(item?.params).includes('isRecommended')
                            ? item.routerLink + '?isRecommended=' + item?.params?.isRecommended
                            : (Object.keys(item).includes('params') && item?.params !== null && Object.keys(item?.params).includes('isFree') ? item.routerLink + '?isFree=' + item?.params?.isFree : item.routerLink)} 
                        className="text-pink-hover fs-5">{item.title}</Link>
                    </CListGroupItem>
                ))
            }

        </CListGroup>

    )
}
