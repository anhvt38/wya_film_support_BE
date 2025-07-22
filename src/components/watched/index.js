"use client"

import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export const Watched = () => {
    return (
        <div className="watched w-full p-3">

            <div className="text-center fs-5">暂无内容</div>
            <div className="d-flex justify-content-between mt-4">
                <FiTrash2 className="fs-5" />
                <div className="d-flex align-items-center gap-1">
                    <span className="fs-5">看</span>
                    <MdKeyboardDoubleArrowRight className="fs-5" />
                </div>
            </div>
           
        </div>
        
      )
}
