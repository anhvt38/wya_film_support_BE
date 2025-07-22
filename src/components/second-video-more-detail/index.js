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
import { convertHotView, ensureHttps, getMediaPlaylistUrl } from "@/utils/common";
import { TbZoomScan } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { useQuery } from "react-query";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getVideoDetail, getVideoTrend } from "@/apis/detail-page";
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
]

export const SecondVideoMoreDetail = (props) => {
    const { videoDetail } = props || {};
    const { title, view = 0, addTime, tags, stars, isFree, videoType, imgPath } = videoDetail || {};
    const [isShowIntroduce, setIsShowIntroduce] = useState(false);
    const [isShowAnalytic, setIsShowAnalytic] = useState(false);

    const [params, setParams] = useState({
        cinema: 2,
        id: "OyIC0OCGJ1U",
        showtype: 0,
        vv: "91d99e3bd4354e846731357a2e0a83e7",
        pub: "CJSqE3GvCZKrC2uoCpGoELyh9ozCZGmCZeuC30wDZ8mPJenPZGuEcCrP3GwEMHaDperDJTZEZKuP39VDJKpDp4mOp4sDp1cD39YOM4nDpXcOpKsD68pOpOvOMHVD3TbCJaoOZ1cE3LXD3KuPJbXCpCuPcOuOZOqDpTaEJ4"
    });

    const { data: videoTrendData }
        = useQuery({
            queryKey: ['video-trend', params],
            queryFn: () => {
                return getVideoTrend(params)
            },
        })

    const { data: videoTrend } = videoTrendData || {};

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
            colors: _.map(chartColors, item => { return item.chartColor }),
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

        // Dữ liệu mẫu
        series.data.setAll([
            { category: "作剧", value: 120 },
            { category: "作剧", value: 180 },
            { category: "作剧", value: 300 },
            { category: "作剧", value: 90 },
            // { category: "作剧", value: 150 },
        ]);


        // Bỏ logo "amCharts" ở góc
        root._logo.dispose();

        return () => root.dispose();
    }, []);

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
            wheelX: "panX",
            wheelY: "zoomX",
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
        var value = 100;

        function generateData() {
            value = Math.round((Math.random() * 10 - 5) + value);
            am5.time.add(date, "day", 1);
            return {
                date: date.getTime(),
                value: value
            };
        }

        function generateDatas(count) {
            var data = [];
            for (var i = 0; i < count; ++i) {
                data.push(generateData());
            }
            return data;
        }


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xRenderer = am5xy.AxisRendererX.new(root, {
            // minorGridEnabled: true,
            minGridDistance: 1,
            // minorLabelsEnabled: true,
            stroke: am5.color(0xFFFFFF),
            strokeOpacity: 0.4
        });
        var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        console.log(xRenderer.get("axisLine"), 'fff')

        xAxis.get("renderer").labels.template.setAll({
            fill: am5.color(0xFFFFFF),
            fontSize: 12,
            fillOpacity: 0.4,
        });


        xAxis.set("minorDateFormats", {
            day: "dd",
            month: "MM"
        });

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                stroke: am5.color(0xFFFFFF),
                strokeOpacity: 0.4

            })
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
            valueYField: "value",
            valueXField: "date",
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
        yAxis.get("renderer").grid.template.set("visible", false);

        var data = generateDatas(7);
        series.data.setAll(data);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

        root._logo.dispose();

        return () => root.dispose();
    }, [])

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
                        {_.map(`步兵,双飞,欧美`.split(','), (v, i) => (
                            <span key={i} className=" px-3 text-color-main bg-secondary-gray">{v}</span>
                        ))}
                    </div>
                    <FaFireFlameCurved className="fs-3 text-danger" />
                    <span>{convertHotView(view)}</span>
                </div>
            </div>
            <CCollapse visible={isShowIntroduce}>
                <div className="d-flex gap-4">
                    <Image alt={title} src={ensureHttps(imgPath)} width={216} height={309} />
                    <div className="d-flex flex-column gap-4">
                        <div className="fs-5">添加: {dayjs(addTime).format('DD/MM/YYYY')}</div>
                        <div className="fs-5">资费: {isFree ? "免费" : ""}</div>
                        <div className="fs-5">分类: {videoType}</div>
                        <div className="fs-5">兵种: {tags && tags[0].label}</div>
                        <div className="fs-5">女优: {stars?.length ? stars[0] : "未知"}</div>
                    </div>
                </div>
            </CCollapse>

            <CCollapse visible={isShowAnalytic}>
                <div className="wrap-chartdiv">
                    <div className="d-flex gap-5 align-items-center">
                        <div id="chartdiv"></div>
                        <div className="wrap-note-chart">
                            {
                                _.map(chartColors, (item, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between">
                                            <div className="d-flex gap-1 align-items-center">
                                                <div className="chart-dot-note" style={{ background: item.color }}></div>
                                                <label>作剧</label>
                                            </div>
                                            <span>0.53%</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="chart-right">
                        <div className="options-filter-chart">
                            <label className="text-main-gray">剧剧剧剧:</label>
                            <div>
                                <span className="text-pink">剧</span>
                                <span>剧</span>
                                <span>剧</span>
                                <span>剧</span>
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
