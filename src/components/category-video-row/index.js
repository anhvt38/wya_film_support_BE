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
import { MainVideoSkeleton } from "../skeleton/main-video-skeleton";


export const CategoryVideoRow = (props) => {
    const { data, isLoading, title = '', isSlider = false, ...rest } = props;

    const sliderRef = useRef(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [total, setTotal] = useState(0);
    const [showSlides, setShowSlides] = useState(7);

    const slideSettings
        = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: showSlides,
        slidesToScroll: 1,
        dotsClass: " slick-dots",
        nextArrow: currentSlide < data?.length - showSlides && <div>
            <MdArrowForwardIos />
        </div>,
        prevArrow: currentSlide > 0 && <div><MdArrowBackIosNew /></div>,
        afterChange: (newIndex) => {
            setCurrentSlide(newIndex);
        },
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: showSlides,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: showSlides,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: showSlides,
                }
            }
        ]
    };

    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          if (width < 576) setShowSlides(2);
          else if (width < 768) setShowSlides(4);
          else if (width < 992) setShowSlides(5);
          else setShowSlides(7);
        };
    
        handleResize(); // Gọi lần đầu
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    return (

        <CommonVideoRow title={title} {...rest}>
            {
                isLoading
                    ? <div className=" d-flex flex-wrap">
                        {
                            _.map(_.fill(Array(6), null), (item, index) => (
                                <div key={index} className="col-3 col-lg-2">
                                    <MainVideoSkeleton />
                                </div>
                            ))
                        }
                    </div>
                    : <div className="mt-4">
                        {
                            isSlider
                                ? <div className="slider-video-row" ref={sliderRef}>
                                    <Slider {...slideSettings} className="rounded ">

                                        {
                                            _.map(data, (item, index) => {
                                                return(
                                                    <MainVideoItem key={index} item={item} />
                                                );
                                            })
                                        }
                                    </Slider>
                                </div>
                                : <div className="category-video-row">
                                    {
                                            _.map(data, (item, index) => {
                                                return(
                                                    <MainVideoItem key={index} item={item} />
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
