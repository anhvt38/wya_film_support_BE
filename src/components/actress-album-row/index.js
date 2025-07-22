"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import { NewVideoItem } from "../new-video-item";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { MainVideoItem } from "../main-video-item";
import _ from 'lodash-es';
import { ActressAlbumItem } from "../actress-album-item";
import { ActressAlbumSkeleton } from "../skeleton/actress-album-skeleton";
import { getAllHotAlbums } from "@/apis/homepage";
import { useQuery } from "react-query";
import { ActressAlbumDetail } from "../actress-album-detail";


export const ActressAlbumRow = (props) => {
    const { title = '' } = props;
    const [totalItem, setTotalItem] = useState(10);
    const [detail, setDetail] = useState(null);

    const [params, setParams] = useState({
        })
    
        const { data: hotAlbumDatas, isLoading }
        = useQuery({
            queryKey: ['hotAlbums'],
            queryFn: () => {
                return getAllHotAlbums({
                    ...params
                })
            },
        })
    
        const { data: hotAlbums } = hotAlbumDatas || {};


        useEffect(() => {
                const handleResize = () => {
                    const width = window.innerWidth;
                    if (width >= 1912) setTotalItem(16)
                    else if (width >= 1679) setTotalItem(14)
                    else if (width >= 1440) setTotalItem(12)
                    else if (width >= 1280) setTotalItem(10)
        
                };
        
                handleResize();
                window.addEventListener("resize", handleResize);
                return () => window.removeEventListener("resize", handleResize);
            }, []);

    return (
        <>
        <CommonVideoRow title={"发现"} isReload={true}>
            {
                isLoading
                    ? <div className=" d-flex flex-wrap">
                        {
                            _.map(_.fill(Array(6), null), (item, index) => (
                                <div key={index} className="col-3 col-lg-2">
                                    <ActressAlbumSkeleton />
                                </div>
                            ))
                        }
                    </div>
                    : <div className="actress-album-row">
                        {
                            _.map(hotAlbums?.info?.slice(0, totalItem), (item, index) => (
                                <ActressAlbumItem item={item} onShowDetail={() => setDetail(item)} key={index} />
                            ))
                        }
                    </div>
            }

        </CommonVideoRow>
        {
            detail &&
        <ActressAlbumDetail onClose={() => setDetail(null)} />

        }
</>
    )
}
