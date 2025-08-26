"use client"

import { CCollapse, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoClose, IoEyeOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaPlay, FaRegPlayCircle, FaRegStar } from "react-icons/fa";
import _ from "lodash-es";
import { convertHotView, ensureHttps, getConvertedQuery, getMediaPlaylistUrl } from "@/utils/common";
import { TbZoomScan } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { useQuery } from "react-query";
import { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getVideoDetail, getVideoPie, getVideoTrend } from "@/apis/detail-page";
import Hls from "hls.js";
import { ImPause } from "react-icons/im";
import { CommonDropdown } from "../common-dropdown";
import { VIDEO_SPEEDS } from "@/contants/time";
import { MdKeyboardDoubleArrowRight, MdOutlineNewspaper } from "react-icons/md";
import { CommonDropdownHover } from "../common-dropdown-hover";
import { IoIosArrowDown, IoIosArrowUp, IoMdPause, IoMdPhonePortrait, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { CommonVolume } from "../common-volume";
import { AdsOnVideo } from "../ads-on-video";
import Draggable from "react-draggable";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import dayjs from "dayjs";
import { GrAnalytics } from "react-icons/gr";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import * as am5xy from "@amcharts/amcharts5/xy";
import am5locales_zh_Hans from "@amcharts/amcharts5/locales/zh_Hans";
import { MainContext } from "@/layouts/MainLayout";
import { useParams } from "next/navigation";
import { POPULAR_TRENDS } from "@/contants/variables";

const chartColors = [
    {
        chartColor: am5.color(0xfc748c),
        color: `#fc748c`
    },
    {
        chartColor: am5.color(0x33C1FF),
        color: `#33C1FF`
    },
    {
        chartColor: am5.color(0x75FF33),
        color: `#75FF33`
    },
    {
        chartColor: am5.color(0xFF33F6),
        color: `#FF33F6`
    },
    {
        chartColor: am5.color(0x2F4074),
        color: `#2F4074`
    },
    {
        chartColor: am5.color(0x84B761),
        color: `#84B761`
    },
    {
        chartColor: am5.color(0xCC4748),
        color: `#CC4748`
    },
    {
        chartColor: am5.color(0xFDD400),
        color: `#FDD400`
    },
    {
        chartColor: am5.color(0x6B716B),
        color: `#6B716B`
    },
    {
        chartColor: am5.color(0xCD82AD),
        color: `#CD82AD`
    },
]

export const SecondVideoMoreDetail = (props) => {
    const { videoDetail, videoId } = props || {};
    const { publicKey, privateKey } = useContext(MainContext);

    const { title, view = 0, add_date, addTime, tags, stars, isFree, videoType, imgPath, sNo } = videoDetail || {};
    const [isShowIntroduce, setIsShowIntroduce] = useState(false);
    const [isShowAnalytic, setIsShowAnalytic] = useState(false);
    const [showType, setShowType] = useState(POPULAR_TRENDS[0].showtype);

    const [videoPieParams, setVideoPieParams] = useState({
        cinema: 2,
        id: videoId
    });

    const [videoTrendParams, setVideoTrendParams] = useState({
        cinema: 2,
        id: videoId,
        showtype: showType
    });



    const { data: videoPieData }
        = useQuery({
            queryKey: ['video-pie', videoPieParams, publicKey, privateKey, videoId],
            queryFn: () => {
                const convertedQuery = getConvertedQuery(videoPieParams, publicKey, privateKey)
                return getVideoPie(convertedQuery)
            },
            enabled: !!publicKey && !!videoId
        })

    const { data: videoTrendData }
        = useQuery({
            queryKey: ['video-trend', videoTrendParams, publicKey, privateKey, videoId, showType],
            queryFn: () => {
                const convertedQuery = getConvertedQuery({
                    ...videoTrendParams,
                    showtype: showType
                }, publicKey, privateKey)
                return getVideoTrend(convertedQuery)
            },
            enabled: !!publicKey && !!videoId
        })


    getVideoTrend
    const { data: videoPie } = videoPieData || {};
    const { data: videoTrend } = videoTrendData || {};

    const ageSexCount = videoPie?.info.AgeSexCount;
    if (ageSexCount) {
        delete ageSexCount['未知']
    }

    const ageSexCountTotal = _.reduce(ageSexCount, (sum, item) => {
        return sum + item
    }, 0)
    const convertedAgeSexCount = _.map(_.omitBy(ageSexCount, (value) => value === 0), (value, key) => ({ key, value: (value / ageSexCountTotal * 100).toFixed(2) }));
    const mergedAgeSexCount = _.map(convertedAgeSexCount, (item, index) => {
        if (chartColors[index]) {
            return { ...item, ...chartColors[index] };
        }
        return item;
    });

    useLayoutEffect(() => {
        const root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
            })
        );

        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
            })
        );
        series.labels.template.setAll({
            fill: am5.color(0xFFFFFF),
            fontSize: 12,
            fillOpacity: 0.4,
        });

        series.ticks.template.setAll({
            stroke: am5.color(0xFFFFFF),
            strokeWidth: 1,
            fillOpacity: 0.4,
        });

        series.set("colors", am5.ColorSet.new(root, {
            colors: _.map(mergedAgeSexCount, item => { return item.chartColor }),
            reuse: false // không lặp lại màu khi có nhiều phần
        }));

        series.slices.template.set("tooltipText", "");

        series.labels.template.set("text", "{category}");

        series.slices.template.states.create("hover", {
            scale: 1,
        });

        series.slices.template.events.on("click", (ev) => {
            const slice = ev.target;
            const isPopped = slice.get("isPopped");
            const radius = 20;

            if (isPopped) {
                slice.animate({
                    key: "shiftRadius",
                    to: 0,
                    duration: 300,
                    easing: am5.ease.out(am5.ease.cubic),
                });
                slice.set("isPopped", false);
            } else {
                slice.animate({
                    key: "shiftRadius",
                    to: radius,
                    duration: 300,
                    easing: am5.ease.out(am5.ease.cubic),
                });
                slice.set("isPopped", true);
            }
        });

        const dataChart = _.map(mergedAgeSexCount, item => ({
            category: item.key,
            value: item.value
        })) || [];

        series.set("radius", am5.percent(70)); 

        series.data.setAll(dataChart);


        // Bỏ logo "amCharts" ở góc
        root._logo.dispose();

        return () => root.dispose();
    }, [mergedAgeSexCount]);

    useLayoutEffect(() => {
        var root = am5.Root.new("chartRight");

        const myTheme = am5.Theme.new(root);

        root.locale = am5locales_zh_Hans;

        // Move minor label a bit down
        myTheme.rule("AxisLabel", ["minor"]).setAll({
            dy: 1
        });

        // Tweak minor grid opacity
        myTheme.rule("Grid", ["minor"]).setAll({
            strokeOpacity: 0.08
        });

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root),
            myTheme
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            paddingLeft: 0
        }));

        chart.zoomOutButton.set("forceHidden", true);

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomX"
        }));
        cursor.lineY.set("visible", false);

        var date = new Date();
        date.setHours(0, 0, 0, 0);



        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xRenderer = am5xy.AxisRendererX.new(root, {
            // minorGridEnabled: true,
            minGridDistance: 20,
            // minorLabelsEnabled: true,
            stroke: am5.color(0xFFFFFF),
            strokeOpacity: 0.4
        });
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "labelX",
            renderer: xRenderer,
        }));


        xAxis.get("renderer").labels.template.setAll({
            fill: am5.color(0xFFFFFF),
            fontSize: 12,
            fillOpacity: 0.4,
        });

        const yRenderer = am5xy.AxisRendererY.new(root, {
            stroke: am5.color(0xFFFFFF),
            strokeOpacity: 0.4
        });

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: yRenderer,
            // categoryField: "labelY",
        }));

        yAxis.get("renderer").labels.template.setAll({
            fill: am5.color(0xFFFFFF),
            fontSize: 12,
            fillOpacity: 0.4,
        });


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            // categoryYField: "labelY",
            categoryXField: "labelX",
            valueYField: "value",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        // Actual bullet
        series.bullets.push(function () {
            var bulletCircle = am5.Circle.new(root, {
                radius: 3,
                fill: am5.color(0xfc748c),
                strokeWidth: 3
            });
            return am5.Bullet.new(root, {
                sprite: bulletCircle
            })
        })

        series.set("stroke", am5.color(0xfc748c));

        xAxis.get("renderer").grid.template.set("visible", false);
        yAxis.get("renderer").labels.template.adapters.add("text", (text, target) => {
            let val = target.dataItem?.get("value");
            if (val != null) {
                let num = Math.ceil(val / 10000);
                return num + "万";
            }
            return text;
        });


        var data = videoTrend?.info.result?.map((item, idx) => {
            const rawLabel = videoTrend?.info.unit == "月"
                ? item.key.slice(5) + `${item.isStartYear ? "\n" + `(${item.key.slice(0, 4)})` : ''}`
                : item.key;
            return ({
                labelX: (videoTrend?.info.unit == "月"
                    ? item.key.slice(5) + "\n" + `(2025)`
                    : item.key) + "_" + idx,
                rawLabelX: rawLabel,
                value: item.hot
            })
        }) || [];

        const yCats = _.uniqBy(data, 'labelY').map(d => ({ labelY: d.labelY }));

        xAxis.data.setAll(data.map(d => ({ labelX: d.labelX, rawLabelX: d.rawLabelX })));
        yAxis.data.setAll(yCats);
        series.data.setAll(data);

        xAxis.get("renderer").labels.template.adapters.add("text", (text, target) => {
            return target.dataItem?.dataContext?.rawLabelX ?? text;
        });

        xAxis.get("renderer").labels.template.setAll({
            textAlign: "center",
            centerX: am5.p50
        });


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

        root._logo.dispose();

        return () => root.dispose();
    }, [videoTrend])

    return (
        <div className="second-video-more-detail">
            <h1 className="text-white fs-2">{title}</h1>
            <div className="my-4 d-flex gap-5">
                <div className={`d-flex align-items-center gap-1 fs-5 cursor-pointer ${isShowIntroduce ? 'text-pink' : "text-color-main"}`}
                    onClick={() => {
                        setIsShowIntroduce(!isShowIntroduce)
                        setIsShowAnalytic(false)
                    }}
                >
                    <MdOutlineNewspaper />
                    <span>简介</span>
                    {
                        isShowIntroduce ? <IoIosArrowUp /> : <IoIosArrowDown />
                    }

                </div>
                <div className={`d-flex align-items-center gap-1 fs-5 cursor-pointer ${isShowAnalytic ? 'text-pink' : "text-color-main"}`}
                    onClick={() => {
                        setIsShowAnalytic(!isShowAnalytic)
                        setIsShowIntroduce(false)
                    }}
                >
                    <GrAnalytics />
                    <span>统计</span>
                    {
                        isShowAnalytic ? <IoIosArrowUp /> : <IoIosArrowDown />
                    }

                </div>
                <div className="d-flex gap-2 align-items-center">
                    <div className="d-flex gap-2 me-3">
                        {_.map(tags, (v, i) => (
                            <span key={i} className=" px-3 text-color-main bg-secondary-gray">{v.label}</span>
                        ))}
                    </div>
                    <FaFireFlameCurved className="fs-3 text-danger" />
                    <span>{convertHotView(view)}</span>
                </div>
            </div>
            <CCollapse visible={isShowIntroduce}>
                <div className="d-flex gap-4">
                    {
                        imgPath &&
                        <Image alt={"star-thumb"} src={ensureHttps(imgPath)} width={216} height={309} />
                    }
                    <div className="d-flex flex-column gap-4">
                        <div className="fs-5">添加: {add_date}</div>
                        {
                            sNo &&
                            <div className="fs-5">番号: {sNo}</div>
                        }
                        <div className="fs-5">资费: {isFree ? "免费" : ""}</div>
                        <div className="fs-5">分类: {videoType}</div>
                        <div className="fs-5">兵种: {tags && tags[0].label}</div>
                        <div className="fs-5">女优: {stars?.length ? stars[0] : "未知"}</div>
                    </div>
                </div>
            </CCollapse>

            <CCollapse visible={isShowAnalytic}>
                <div className="wrap-chartdiv">
                    <div>
                        <span className="fs-4 text-main-gray">喜欢此剧的人群:</span>
                        <div className="d-flex h-full gap-5 align-items-start">
                            <div id="chartdiv"></div>
                            <div className="wrap-note-chart">
                                {
                                    _.map(mergedAgeSexCount, (item, index) => {
                                        return (
                                            <div key={index} className="d-flex justify-content-between">
                                                <div className="d-flex gap-1 align-items-center">
                                                    <div className="chart-dot-note" style={{ background: item.color }}></div>
                                                    <label>{item.key}</label>
                                                </div>
                                                <span>{item.value}%</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="chart-right">
                        <div className="options-filter-chart">
                            <label className="text-main-gray fs-5">人气走向：</label>
                            <div>
                                {
                                    _.map(POPULAR_TRENDS, (item, index) => {
                                        return <span
                                            key={index}
                                            onClick={() => setShowType(item.showtype)}
                                            className={item.showtype == showType ? "text-pink cursor-pointer" : "cursor-pointer"}
                                        >{item.label}
                                        </span>

                                    })
                                }
                            </div>
                        </div>
                        <div id="chartRight">

                        </div>
                    </div>
                </div>
            </CCollapse>
        </div>
    )
}
