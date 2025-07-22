"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import { NewVideoItem } from "../new-video-item";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import _ from 'lodash-es';
import { NewUploadSkeleton } from "../skeleton/new-upload-skeleton";
import { useQuery } from "react-query";
import { getAllHotVideoTop, getNewHotVideoGroup } from "@/apis/homepage";
import { NewVideoItemMore } from "../new-video-item-more";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

export const NewUploadRow = (props) => {
    const { data, isLoading, title = '', isSlider = false, moreList, ...rest } = props;
    const sliderRef = useRef(0);
    // const [currentSlide, setCurrentSlide] = useState(0);
    // const [showSlides, setShowSlides] = useState(3);


    // const slideSettings
    //     = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 8,
    //     slidesToScroll: showSlides,
    //     dotsClass: " slick-dots",
    //     nextArrow: currentSlide < data?.length - showSlides && <div>
    //         <MdArrowForwardIos />
    //     </div>,
    //     prevArrow: currentSlide > 0 && <div><MdArrowBackIosNew /></div>,
    //     afterChange: (newIndex) => {
    //         setCurrentSlide(newIndex);
    //     },
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 slidesToShow: showSlides,
    //             }
    //         },
    //         {
    //             breakpoint: 414,
    //             settings: {
    //                 slidesToShow: showSlides,
    //             }
    //         },
    //     ]
    // };

    // useEffect(() => {
    //     const handleResize = () => {
    //         const width = window.innerWidth;
    //         if (width < 414) setShowSlides(1);
    //         else if (width < 992) setShowSlides(2);
    //         else setShowSlides(3);
    //     };

    //     handleResize(); // Gọi lần đầu
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    return (

        <CommonVideoRow title={title} {...rest}>

            {
                isLoading
                    ? <div className=" d-flex overflow-hidden">
                        {
                            _.map(_.fill(Array(4), null), (item, index) => (
                                <div key={index} className="col-6 col-md-3">
                                    <NewUploadSkeleton />
                                </div>
                            ))
                        }
                    </div>
                    : <div>
                        {
                            isSlider
                                ? <div className="new-upload-row-slider" ref={sliderRef}>

                                    <Carousel
                                        responsive={responsive}
                                        slidesToSlide={4}
                                        partialVisible={false}
                                        customLeftArrow={<div className="prev-arrow"><MdArrowBackIosNew /></div>}
                                        customRightArrow={<div className="next-arrow"><MdArrowForwardIos /></div>}
                                    >
                                        {
                                            _.map(data, (item, index) => {
                                                return (
                                                    <div key={index} className="mx-1">
                                                        <NewVideoItem item={item} />
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            moreList?.length &&
                                            <NewVideoItemMore data={moreList} />
                                        }
                                    </Carousel>

                                </div>
                                : <div className="new-upload-row-normal">
                                    {
                                        _.map(data, (item, index) => {
                                            return (
                                                <NewVideoItem key={index} item={item} />
                                            );
                                        })
                                    }
                                </div>
                        }
                    </div>
            }

        </CommonVideoRow>

    )
}
