"use client"

import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import Image from "next/image";
import { routes } from "@/contants/routes";

export const UpgradeVip = () => {
    return (
        <div className="upgrade-vip w-full">
            <div className=" d-flex gap-2 align-items-center justify-content-between upgrade-vip-action">
                <div className="py-2 px-2 text-white fw-bold">还不是VIP会员?</div>
                
                <CButton className="bg-pink text-white rounded-0" href={`/vip-center/index/0`}>
                    <small>                    
立即开放      
                    </small>
                </CButton>
            </div>

            <div className="p-3">

                <CListGroup>
                    <CListGroupItem className="mt-0">
                        <Link href={`/vip-center/index/0`} className="d-flex gap-3 align-items-center">
                            <Image alt="" src="/vip_44_wuma@3x.png" width={40} height={40} />
                            <p className="m-0">
                            解锁步兵棋子</p>
                        </Link>
                    </CListGroupItem>


                    <CListGroupItem>
                        <Link href={`/vip-center/index/1`} className="d-flex gap-3 align-items-center">
                            <Image alt="" src="/vip_44_fanhao@3x.png" width={40} height={40} />
                            <p className="m-0">
                            解读序列号</p>
                        </Link>
                    </CListGroupItem>

                    <CListGroupItem>
                        <Link href={`/vip-center/index/2`} className="d-flex gap-3 align-items-center">
                            <Image alt="" src="/vip_44_shiwan@3x.png" width={40} height={40} />
                            <p className="m-0">解锁10万部影片资源
                            </p>
                        </Link>
                    </CListGroupItem>

                    <CListGroupItem>
                        <Link href={`/vip-center/index/3`} className="d-flex gap-3 align-items-center">
                            <Image alt="" src="/vip_44_ad@3x.png" width={40} height={40} />
                            <p className="m-0">过滤播放器广告
                            </p>
                        </Link>
                    </CListGroupItem>

                    <CListGroupItem>
                        <Link href={`/vip-center/index/4`} className="d-flex gap-3 align-items-center">
                            <Image alt="" src="/vip_44_download@3x.png" width={40} height={40} />
                            <p className="m-0">离线玩
                            </p>
                        </Link>
                    </CListGroupItem>

                    <CListGroupItem>
                        <Link href={`/vip-center/index/5`} className="d-flex gap-3 align-items-center">
                            <Image alt="" src="/vip_44_cloud@3x.png" width={40} height={40} />
                            <p className="m-0">云加速
                            </p>
                        </Link>
                    </CListGroupItem>

                </CListGroup>
            </div>
        </div>
        
      )
}
