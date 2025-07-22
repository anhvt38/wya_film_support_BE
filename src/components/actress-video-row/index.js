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
import { ActressItem } from "../actress-item";
import { ActressSkeleton } from "../skeleton/actress-skeleton";
import { getStarList } from "@/apis/homepage";
import { useQuery } from "react-query";
import { routes } from "@/contants/routes";


export const ActressVideoRow = (props) => {
    const { title = '' } = props;
    const [totalStar, setTotalStar] = useState(16)

    const [params, setParams] = useState({
        cinema: 2,
        page: 1,
        size: 16,
        orderBy: 1,
        desc: 1,
        vv: "5f210d36fd9f96c9b85f87569ba5ea51",
        pub: "1751424006780"
    })

    const { data: starListDatas, isLoading }
        = useQuery({
            queryKey: ['star-list'],
            queryFn: () => {
                return getStarList({
                    ...params
                })
            },
        })

    const { data: starList } = starListDatas || {};

    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          if (width >= 1912) setTotalStar(16)
          else if (width >= 1280) setTotalStar(16)
    
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    return (

        <CommonVideoRow title={"女优"} moreLink={routes.celebrities}>
            {
                isLoading
                    ? <div className=" d-flex flex-wrap">
                        {
                            _.map(_.fill(Array(8), null), (_, index) => (
                                <div key={index} className="col-6 col-sm-3">
                                    <ActressSkeleton />
                                </div>
                            ))
                        }
                    </div>
                    : <div className="actress-video-row">
                        {
                            _.map(starList?.info[0]?.list?.slice(0, totalStar), (item, index) => {
                                return (
                                    <ActressItem key={index} item={item} />
                                )
                            })
                        }
                    </div>
            }

        </CommonVideoRow>

    )
}
