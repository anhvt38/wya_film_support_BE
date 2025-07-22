"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import { NewVideoItem } from "../new-video-item";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { LivestreamVideoItem } from "../livestream-video-item";
import _ from "lodash-es";
import { LivestreamVideoSkeleton } from "../skeleton/livestream-video-skeleton";
import { getAdultLiveList } from "@/apis/homepage";
import { useQuery } from "react-query";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import VideoPreview from "../video-preview";
import HLSVideoPreview from "../hls-video-preview";

const responsive = {
    superDesktop: {
        breakpoint: { max: 3000, min: 1440 },
        items: 4,
        // partialVisibilityGutter: 100 
    },
    desktop: {
        breakpoint: { max: 1440, min: 1024 },
        items: 3,
        // partialVisibilityGutter: 50 
    },
    tablet: {
        breakpoint: { max: 1024, min: 576 },
        items: 2,
        // partialVisibilityGutter: 100 
    },
    mobile: {
        breakpoint: { max: 576, min: 0 },
        items: 1,
        // partialVisibilityGutter: 20 
    }
}

export const NightLivestreamRow = (props) => {
    const sliderRef = useRef(0);

    const [params, setParams] = useState({
    })

    const { data: adultLiveListData, isLoading }
        = useQuery({
            queryKey: ['adult-live-list'],
            queryFn: () => {
                return getAdultLiveList({
                    ...params
                })
            },
        })

    const { data: adultLiveList } = adultLiveListData || {};
    return (

        <CommonVideoRow title="午夜直播" isRowLivestream={true}>
            {
                isLoading
                    ? <div className="d-flex overflow-hidden">
                        {
                            _.map(_.fill(Array(4), null), (item, index) => (
                                <div key={index} className="col-6 col-md-3">
                                    <LivestreamVideoSkeleton />
                                </div>
                            ))
                        }
                    </div>
                    : <div className="wrap-slider night-livestream-row-slider" ref={sliderRef}>
                        <Carousel
                            responsive={responsive}
                            slidesToSlide={4}
                            partialVisible={false}
                            customLeftArrow={<div className="prev-arrow"><MdArrowBackIosNew /></div>}
                            customRightArrow={<div className="next-arrow"><MdArrowForwardIos /></div>}
                        >
                            {
                                _.map(adultLiveList?.info, (item, index) => {
                                    return (
                                        <div key={index} className="mx-1">
                                            {/* <LivestreamVideoItem item={item} /> */}
                                            <HLSVideoPreview key={index} item={item} />
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>

            }

        </CommonVideoRow>

    )
}
