"use client"

import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useQuery } from "react-query";
import { getObtainListWithCount } from "@/apis/homepage";
import { orderBy } from "lodash-es";
import { useContext, useState } from "react";
import { routes } from "@/contants/routes";
import { MainContext } from "@/layouts/MainLayout";

export const Watched = () => {
    const isLogined = true;
        const { privateKey, publicKey } = useContext(MainContext);
    
    const [params, setParams] = useState({
        uid: 129871368,
        expire: 1759629004.67996,
        gid: 0,
    })

    const [bodies, setBodies] = useState({
        cinema: 2,
        pageSize: 10,
        orderBy: 'time',
        pageIndex: 1,
        desc: 1,
        cid: 2,
    })

    const { data }
        = useQuery({
          queryKey: ['obtain-list-with-count', bodies, params, publicKey, privateKey],
          queryFn: () => {
            return getObtainListWithCount({
                ...bodies,
                vv: privateKey,
                pub: publicKey
            }, {
                ...params,
                vv: privateKey,
                pub: publicKey
            })
          },
          enabled: !!publicKey && !!privateKey
        })
    return (
        <div className="watched w-full">
            {
                isLogined
                    ? <CListGroup className="watched-list py-3">
                        <CListGroupItem className="p-0">
                            <Link href="" className="text-white-hover fs-6 text-main-gray p-3">
                                <span className="truncate-one-line">他的第一次深度高潮令人惊叹。</span>
                                <span className="text-center">预览</span>
                                <span className="text-end">2025-08-02</span>
                            </Link>
                        </CListGroupItem>
                        <CListGroupItem className="p-0">
                            <Link href="" className="text-white-hover fs-6 text-main-gray p-3">
                                <span className="truncate-one-line">他的第一次深度高潮令人惊叹。</span>
                                <span className="text-center">预览</span>
                                <span className="text-end">2025-08-02</span>
                            </Link>
                        </CListGroupItem>
                        <CListGroupItem className="p-0">
                            <Link href="" className="text-white-hover fs-6 text-main-gray p-3">
                                <span className="truncate-one-line">他的第一次深度高潮令人惊叹。</span>
                                <span className="text-center">预览</span>
                                <span className="text-end">2025-08-02</span>
                            </Link>
                        </CListGroupItem>
                        <CListGroupItem className="p-0">
                            <Link href="" className="text-white-hover fs-6 text-main-gray p-3">
                                <span className="truncate-one-line">他的第一次深度高潮令人惊叹。</span>
                                <span className="text-center">预览</span>
                                <span className="text-end">2025-08-02</span>
                            </Link>
                        </CListGroupItem>
                        <CListGroupItem className="p-0">
                            <Link href="" className="text-white-hover fs-6 text-main-gray p-3">
                                <span className="truncate-one-line">他的第一次深度高潮令人惊叹。</span>
                                <span className="text-center">预览</span>
                                <span className="text-end">2025-08-02</span>
                            </Link>
                        </CListGroupItem>
                    </CListGroup>
                    : <div className="text-center fs-5">暂无内容</div>
            }
            
            <div className="d-flex justify-content-between align-items-center mt-1 p-3">
                <FiTrash2 className="fs-5 text-white-hover cursor-pointer" />
                <Link className="d-flex align-items-center text-white-hover cursor-pointer" href={`${routes.watchHistory}`}>
                    <span className="fs-5">看</span>
                    <MdKeyboardDoubleArrowRight className="fs-5" />
                </Link>
            </div>
           
        </div>
        
      )
}
