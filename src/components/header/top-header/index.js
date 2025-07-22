"use client"


import { routes } from "@/contants/routes";
import Link from "next/link";
import "./styles.scss";
import _ from "lodash";
import Image from "next/image";
import { useState } from "react";

const menuData = [
    {
        text: "Trang chủ",
        link: "#",
        active: true
    },
    {
        text: "Giới thiệu",
        link: "",
        subMenu: [
            {
                text: "Lịch sử phát triển",
                link: "#"
            },
            {
                text: "Tổ chức năng",
                link: "#",
                subMenu: [
                    {
                        text: "Tổ hành chính tổng hợp",
                        link: "#"
                    },
                    {
                        text: "Tổ đào tạo",
                        link: "#"
                    },
                ]
            },

        ]
    },
    
    {
        text: "Trung tâm",
        link: "#",
    },
    {
        text: "Trang chủ",
        link: "#",
    },
    {
        text: "Trang chủ",
        link: "#",
    },
]

export default function TopHeader() {
    const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);

    return (
        <header className="header">header
        </header>
        
    );
}