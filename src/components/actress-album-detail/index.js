"use client"

import { CButton, CListGroup, CListGroupItem, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import { NewVideoItem } from "../new-video-item";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { MainVideoItem } from "../main-video-item";
import _ from 'lodash-es';
import { ActressAlbumItem } from "../actress-album-item";
import { ActressAlbumSkeleton } from "../skeleton/actress-album-skeleton";
import { getAllHotAlbums } from "@/apis/homepage";
import { useInfiniteQuery, useQuery } from "react-query";
import { FaRegImage, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { BiLike, BiMessageDots } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getListTrends, getTrends } from "@/apis/detail-page";
import CommentListActress from "../comment-list-actress";
import BoxCommentActress from "../box-comment-actress";
import { MainContext } from "@/layouts/MainLayout";

const ALL_CMT = [
    {
        id: 0,
        text: "鉴定完毕",
        isParent: true,
        childs: [
            {
                id: 100,
                text: "北京男"
            },
            {
                id: 101,
                text: "天津女",
                replyCmtId: 100
            }
        ]
    },
    {
        id: 1,
        text: "鉴定完毕",
        isParent: true,

    },
    {
        id: 2,
        text: "鉴定完毕",
        isParent: true,

    }
]

const PrevArrow = ({ onClick }) => (
    <IoIosArrowBack
        onClick={onClick}
        style={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            zIndex: 2,
            fontSize: "2rem",
            cursor: "pointer",
        }}
        className="text-white-hover"
    />
);

// Tuỳ chỉnh nút phải
const NextArrow = ({ onClick }) => (
    <IoIosArrowForward
        onClick={onClick}
        style={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            zIndex: 2,
            fontSize: "2rem",
            cursor: "pointer",
        }}
        className="text-white-hover"
    />
);

export const ActressAlbumDetail = (props) => {
    const { onClose } = props;
    const isLogined = true;
    const { setIsOpenAuthModal } = useContext(MainContext);

    const [current, setCurrent] = useState(0);
    const [listTrendsState, setListTrendsState] = useState([]);

    const [params, setParams] = useState({
        cinema: 2,
        pid: 31810

    })

    const [bodyTrends, setBodyTrends] = useState({
        vv: "78823efca67d34ad597da0cdfb24ec94",
        pub: "CJSqEJ0vCJSpDouqDJCvDLyfewzCJGvBZ4mCYuoCp4kE31VOZ5YOMCsPJDYCs4oD6KoD65aC38pOZ4nPZWqCpTaDMPVP3GtP34qDZGrOJOrDJaqCZTbDZWqOJTZDZCpDJTcOZ5"
    })

    const [listTrendParams, setListTrendParams] = useState({
        cinema: 2,
        touid: 129005631
    })


    const [listTrendBody, setListTrendBody] = useState({
        page: 1,
        size: 10,
        vv: "767348a272b08f31bc98991a8279851c",
        pub: "CJSqEJ8mC3arCYutE38nCbyh9ozCZGmCZeuC30wDZ8mPJenPZGuEZ4mP3KwDM9ZCpetEM4wPZauCLySd1cmiR8S6vkRCp8Q6hCoi9WOcfiQch2QiHYoCneQcQzOpPaOJ0tOJapC6CnC3SoOpWoCJanPJ4vDpbcOc8tDM6"
    })

    const mainSlider = useRef();
    const thumbContainerRef = useRef();
    const loadMoreRef = useRef(null);

    const mainSettings = {
        arrows: true,
        fade: true,
        infinite: false,
        beforeChange: (_, next) => setCurrent(next),
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };



    const { data: trendDatas, isLoading }
        = useQuery({
            queryKey: ['get-trends', params],
            queryFn: () => {
                return getTrends(bodyTrends, params)
            },
        })

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['get-list-trends1', listTrendBody, listTrendParams],
        queryFn: ({ pageParam = 1, queryKey }) => {

            const [, listTrendBody, listTrendParams] = queryKey;

            return getListTrends(listTrendBody, listTrendParams, pageParam
            );
        },
        onSuccess: (data) => {
            let mergeListTrends = []
            _.forEach(data.pages, item => {
                mergeListTrends = [
                    ...mergeListTrends,
                    ...item.data.info[0].list
                ]
            })
            setListTrendsState(mergeListTrends)
        },
        getNextPageParam: (lastPage, allPages) => {
            const total = lastPage.data.info[0].recordCount;
            const totalPage = Math.ceil(total / listTrendBody.size)
            return listTrendBody.page < totalPage
                ? listTrendBody.page + 1
                : false;
        },
    });

    const trend = trendDatas?.data.info[0];

    const { avatar, countryCode, fansCount, favoriteCount, likeCount, like, label, photoCount, photoAlbumDetailsList, nickName, viewCount, comments, title, createTimeStr } = trend || {};


    const scrollThumbs = (direction) => {
        const container = thumbContainerRef.current;
        const thumbCount = photoAlbumDetailsList.length;

        let newIndex = current + (direction === "left" ? -1 : 1);

        // Giới hạn không vượt khỏi mảng
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= thumbCount) newIndex = thumbCount - 1;

        // Cập nhật ảnh lớn
        setCurrent(newIndex);
        mainSlider.current.slickGoTo(newIndex);

        // Scroll thumbnail container một đoạn
        const scrollAmount = 100;
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };


    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {

                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage, isFetchingNextPage]);


    return (
        <div className="actress-album-detail">
            <div className="actress-detail-left">
                <IoClose className='close-actress-album fs-1' onClick={onClose} />
                <div className="position-relative">
                    <Slider {...mainSettings} ref={mainSlider}>
                        {_.map(photoAlbumDetailsList, (item, i) => (
                            <div key={i} className="wrap-big-image">
                                <Image
                                    src={item.imgPath}
                                    alt={`img-${i}`}
                                    className="big-main-image"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                            </div>
                        ))}
                    </Slider>

                    {/* Index */}
                    <div className="text-center text-white my-3">
                        {current + 1} / {photoAlbumDetailsList?.length}
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="thumbs">
                    <IoIosArrowBack
                        onClick={() => scrollThumbs("left")}
                        style={{
                            top: "50%",
                            left: "-30px",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            fontSize: "2rem",
                        }}
                        className="text-white-hover position-absolute cursor-pointer"
                    />
                    <div
                        ref={thumbContainerRef}
                        className="d-flex justify-content-center gap-1"
                    >
                        {_.map(photoAlbumDetailsList, (item, i) => (
                            <div key={i} onClick={() => {
                                setCurrent(i);
                                mainSlider.current.slickGoTo(i);
                            }}>
                                <Image
                                    src={item.imgPath}
                                    alt={`thumb-${i}`}
                                    width={31}
                                    height={31}
                                    style={{
                                        border: current === i ? "2px solid #fc748c" : "none",
                                    }}
                                    className="objectfit-cover cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                    <IoIosArrowForward
                        onClick={() => scrollThumbs("right")}
                        style={{
                            top: "50%",
                            right: "-30px",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            fontSize: "2rem",
                        }}
                        className="text-white-hover position-absolute cursor-pointer"
                    />
                </div>


            </div>

            <div className="actress-detail-center">
                <div>
                    <div className="d-flex gap-3 align-items-center p-3 pb-0">
                    <Image
                        alt={'123'}
                        src={avatar}
                        width={50}
                        height={50}
                        className="rounded-circle objectfit-cover cursor-pointer"
                    />
                    <div>
                        <div className="d-flex gap-2 align-items-center">
                            <Link href="/" className="text-white text-pink-hover truncate-one-line fs-6">{nickName}</Link>
                            <Image
                                alt={'flag'}
                                src={''}
                                width={15}
                                height={10}
                                className=" objectfit-cover cursor-pointer"
                            />
                        </div>
                        <span className="text-main-gray">{createTimeStr}</span>
                    </div>
                    <CButton className="text-pink border-pink bg-pink-hover text-white-hover py-1 px-2">+关注 {fansCount}</CButton>
                </div>
                <div className="p-3 text-white pb-0">
                    {title}
                </div>
                <div className="d-flex gap-2 p-3">
                    {
                        _.map(label?.split(','), (item, index) => {
                            return (
                                <small className="bg-main-gray text-main-gray p-1 fs-6 truncate-one-line" key={index}>{item}</small>
                            )
                        })
                    }
                </div>
                <div className="d-flex justify-content-end gap-3 p-3">
                    <div className="d-flex gap-2 align-items-center text-main-gray text-pink-hover">
                        <IoEyeOutline className="fs-5" />
                        <span>{viewCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray">
                        <BiMessageDots className="fs-5" />
                        <span>{comments}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray text-pink-hover cursor-pointer">
                        <FaRegStar className="fs-5" />
                        <span>{favoriteCount}</span>
                    </div>
                    <div className="d-flex gap-2 align-items-center text-main-gray text-pink-hover cursor-pointer">
                        <BiLike className="fs-5" />
                        <span>{likeCount}</span>
                    </div>
                </div>

                <hr className="m-3 mb-0" />

                </div>
                <div className="p-3 pe-2 pt-0 h-full">
                    <div className="overflow-auto h-full pt-3">
                        {/* <div>
                            <small className="bg-main-gray text-main-gray px-2 py-1 text-pink-hover cursor-pointer"> 全部评论 </small>
                            <small className="bg-main-gray text-main-gray px-2 py-1 text-pink-hover cursor-pointer"> 热门评论 </small>
                        </div>
                        <div className="my-5 h-full">
                            <Image
                                alt={'empty'}
                                src={'/empty-comment.png'}
                                width={140}
                                height={102}
                                className=""
                            />
                            <p className="text-center">空荡荡的赶快留下您的金句吧~</p>
                        </div> */}
                        <CTabs activeItemKey={1} defaultActiveItemKey={1}>
                            <CTabList className="comment-tabs-actress">
                                <CTab className="bg-main-gray text-main-gray px-2 py-1 text-pink-hover cursor-pointer" aria-controls="all-comment" itemKey={1}> 全部评论 </CTab>
                                <CTab className="bg-main-gray text-main-gray px-2 py-1 text-pink-hover cursor-pointer" aria-controls="hot-comment" itemKey={2}> 热门评论 </CTab>
                            </CTabList>
                            <CTabContent className="mt-4">
                                {
                                    !isLogined || !ALL_CMT.length 
                                        ? <div className="my-5 h-full d-flex flex-column align-items-center">
                                            <Image
                                                alt={'empty'}
                                                src={'/empty-comment.png'}
                                                width={140}
                                                height={102}
                                                className=""
                                            />
                                            <p className="text-center text-main-gray fs-5">空荡荡的<br />赶快留下您的金句吧~</p>
                                        </div>
                                        : <>
                                            <CTabPanel aria-labelledby="all-comment" itemKey={1}>
                                                <CommentListActress datas={ALL_CMT} />
                                            </CTabPanel>
                                            <CTabPanel aria-labelledby="hot-comment" itemKey={2}>
                                                <CommentListActress datas={ALL_CMT} />
                                            </CTabPanel>
                                        </>
                                }

                            </CTabContent>
                        </CTabs>
                    </div>
                </div>
                <div className="wrap-box-comment-actress"> 
                    <BoxCommentActress isMultiComment={false} />
                </div>
                {
                    !isLogined
                    && <div className="login-to-comment">
                        <p>您还未登录，请登录后再发表评论。</p>
                        <CButton onClick={() => setIsOpenAuthModal(true)} >登录</CButton>
                    </div>
                }
                
            </div>
            <div className="actress-detail-right bg-main-gray">
                <h3 className="fs-5 m-0">TA的动态</h3>
                <div>
                    <CListGroup layout="vertical">
                        {
                            _.map(listTrendsState, (item, index) => {
                                const { id, title, createTimeStr, photoAlbumDetailsList, coverPath } = item || {};
                                return (
                                    <CListGroupItem key={index} className=" white-space-nowrap cursor-pointer fs-5 p-0">
                                        <div className="" >
                                            <div className="position-relative d-inline-block w-full overflow-hidden w-maxcontent">
                                                <Image
                                                    alt={title}
                                                    src={`https://static.wyav.tv${coverPath}`}
                                                    width={105}
                                                    height={105}
                                                    className=" thumb-trend"
                                                    onClick={() => setParams({ ...params, pid: id })}
                                                />
                                                <div className="position-absolute d-flex gap-1 align-items-center bg-dark text-white rounded image-total-badge fs-6">
                                                    <FaRegImage />
                                                    <small>{photoAlbumDetailsList.length}</small>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div
                                                    title={title}
                                                    className=" truncate-one-line text-pink-hover text-white cursor-pointer"
                                                    onClick={() => setParams({ ...params, pid: id })}

                                                >{title}</div>
                                                <div className="text-main-gray fs-6 text-start">{createTimeStr}</div>
                                            </div>
                                        </div>
                                        <hr />
                                    </CListGroupItem>
                                )
                            })
                        }

                        <div ref={loadMoreRef} style={{ height: "1px" }} />

                        <div className="mb-2">
                            {isFetchingNextPage && <Image alt='loading' src="/ic-loading-verify.gif" width={25} height={25} />}

                        </div>

                    </CListGroup>


                </div>
            </div>
        </div>
    )
}
