"use client"

import { CButton, CListGroup, CListGroupItem, CTooltip } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import Image from "next/image";
import { routes } from "@/contants/routes";
import { FaCircleQuestion } from "react-icons/fa6";

export const UploadVideo = () => {
    return (
        <div className="upload-video w-full p-4">

            <div>

                <CListGroup layout="horizontal" className="gap-5">
                    <CListGroupItem className="flex-1">
                        <Link href="#" className="d-flex gap-3 flex-column align-items-center">
                            <Image alt="" src="/shipin.png" width={47} height={35} />
                            <p className="m-0 text-center white-space-nowrap">
                            上传短视频</p>
                        </Link>
                    </CListGroupItem>


                    <CListGroupItem className="flex-1">
                        <Link href="#" className="d-flex gap-3 flex-column align-items-center">
                            <Image alt="" src="/dianying.png" width={47} height={35} />
                            <p className="m-0 text-center d-flex gap-1 white-space-nowrap">上传剧集
                                <span className="upload-movie-question">
                                    <FaCircleQuestion className="text-pink " />
                                </span>
                            </p>
                        </Link>
                    </CListGroupItem>

                    <CListGroupItem className="flex-1">
                        <Link href="#" className="d-flex gap-3 flex-column align-items-center">
                            <Image alt="" src="/dongtai.png" width={47} height={35} />
                            <p className="m-0 text-center">发布更新
                            </p>
                        </Link>
                    </CListGroupItem>

                    <CListGroupItem className="flex-1">
                        <Link href="#" className="d-flex gap-3 flex-column align-items-center">
                            <Image alt="" src="/xiangce.png" width={47} height={35} />
                            <p className="m-0 text-center">相册管理
                            </p>
                        </Link>
                    </CListGroupItem>

                </CListGroup>
            </div>
        </div>

    )
}
