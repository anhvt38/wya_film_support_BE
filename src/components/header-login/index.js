"use client"

import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MainContext } from "@/layouts/MainLayout";
import { useContext } from "react";

export const HeaderLogin = () => {
  const { setIsOpenAuthModal } = useContext(MainContext);

    return (
        <div className="header-login w-full pt-4 pb-3 px-3">
            <div className="d-flex gap-3 align-items-center mb-2 cursor-pointer" onClick={() => setIsOpenAuthModal(true)}>
                <div className="text-white fs-5">立即登录</div>
                <MdOutlineArrowForwardIos className="text-white fs-5" />
            </div>
            <p>观看记录多端同步 尊享高清观影体验</p>
            <div className="mt-3 header-login-info p-3">
                <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
                    <Image alt='vip' src="/login-vip-icon.png" width={38} height={32} />
                    <div>
                        <h6 className="text-light-yellow fw-bold">现在购买，立享VIP限时7...</h6>
                        <p className="fs-6">最低仅需0.24€/天</p>
                    </div>
                    <CButton className="active-now">立即激活</CButton>
                </div>
                <div>
                     <CListGroup layout="horizontal" className="gap-2">
                        <CListGroupItem className="d-flex align-items-center p-0">
                            <Image alt='ads' src="/vip_44_ad@3x.png" width={26} height={26} />
                            <span className="text-main-gray white-space-nowrap fs-6">广告特权</span>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex align-items-center p-0">
                            <Image alt='ads' src="/vip_44_4K@3x.png" width={26} height={26} />
                            <span className="text-main-gray white-space-nowrap fs-6">4K超清</span>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex align-items-center p-0">
                            <Image alt='ads' src="/vip_44_download@3x.png" width={26} height={26} />
                            <span className="text-main-gray white-space-nowrap fs-6">离线下载</span>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex align-items-center p-0">
                            <Image alt='ads' src="/vip_44_expression@3x.png" width={26} height={26} />
                            <span className="text-main-gray white-space-nowrap fs-6">尊贵标识</span>
                        </CListGroupItem>
                     </CListGroup>
                </div>
                
            </div>
           
        </div>
        
      )
}
