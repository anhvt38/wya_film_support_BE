"use client";

import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CButton, CCol, CRow } from "@coreui/react";
import { Video } from "@/components/video";
import { VideoToolbar } from "@/components/video-toolbar";
import Image from "next/image";
import { VideoMoreDetail } from "@/components/video-more-detail";
import { IoArrowDown, IoMaleFemaleOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CommonPopover } from "@/components/common-popover";
import { AuthorInfoPopup } from "@/components/author-info-popup";
import { FcAndroidOs } from "react-icons/fc";
import { RelatedVideos } from "@/components/related-videos";
import { getInfoVideoDetail, getRelatedVideo, getVideoDetail, getVideoDetailType2 } from "@/apis/detail-page";
import { useQuery } from "react-query";
import Link from "next/link";
import _ from "lodash-es";
import { ensureHttps } from "@/utils/common";
import { routes } from "@/contants/routes";
import { SecondVideoMoreDetail } from "@/components/second-video-more-detail";

export const QrDownloadInfo = () => {
  
  return(
    <div className="qr-download-info ">
        <Image alt='qrcode' src="/qr-test.jpg" width={94} height={94} />
        <div>
          <div className="text-white text-center">扫一扫，App观看更便捷！</div>
          <div className="text-white cursor-pointer my-2 d-flex gap-3 align-items-center justify-content-between btn-download-android" >
            <FcAndroidOs className="" />
            <span className="text-center white-space-nowrap"> 下载安卓App </span>
            <IoArrowDown className="" />
          </div>
          <div className="now-download-text">没有App？ 立即下载</div>
        </div>
      </div>
  )
}

