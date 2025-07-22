

import { CFooter, CLink, CListGroup, CListGroupItem } from "@coreui/react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { SelectLanguageDropdown } from "../select-language-dropdown";
import _ from "lodash-es";
import { languages } from "@/contants/variables";
import { routes } from "@/contants/routes";


export default function Footer() {

  const selectLanguage = (item) => {
    localStorage.setItem('lang', JSON.stringify(item))
    window.location.reload()
  }

  return (

    <div className="wrap-footer mt-5">
      <div
        // position="sticky"
        className="footer container border-0 "
      >
        <div className="footer-top py-5 d-flex gap-3 justify-content-center align-items-center w-full">
          <div>
            <CListGroup layout="horizontal" className="footer-top-left">
              <CListGroupItem>
                <Link href={routes.helpTerm} className="text-pink-hover">
                  <p className=" m-0 fs-6">服务条款</p>
                </Link>
              </CListGroupItem>

              <CListGroupItem>
                <Link href={routes.user} className="text-pink-hover">
                  <p className=" m-0 fs-6">个人中心</p>
                </Link>
              </CListGroupItem>
              <CListGroupItem>
                <Link href={routes.help}className="text-pink-hover">
                  <p className=" m-0 fs-6">常见问题</p>
                </Link>
              </CListGroupItem>

              <CListGroupItem>
                <Link href={routes.helpFeedback} className="text-pink-hover">
                  <p className=" m-0 fs-6">在线反馈</p>
                </Link>
              </CListGroupItem>

              <CListGroupItem>
                <Link href="#" className="text-pink-hover">
                  <p className=" m-0 fs-6">充值中心</p>
                </Link>
              </CListGroupItem>

              <CListGroupItem>
                <Link href={routes.adCenter} className="text-pink-hover">
                  <p className=" m-0 fs-6">广告投放</p>
                </Link>
              </CListGroupItem>

              <CListGroupItem>
                <Link href={routes.helpContact} className="text-pink-hover">
                  <p className=" m-0 fs-6">联系我们</p>
                </Link>
              </CListGroupItem>

            </CListGroup>
          </div>
          <Link href={routes.helpContact}>
            <div className="d-flex flex-column align-items-center">
              <Image alt='liên hệ dịch vụ khách hàng' src="/customer.png" width={60} height={60} />
              <p className="text-white mt-3 fs-6">联系客服</p>
            </div>
          </Link>
          
          <Link href={routes.appDownload}>
          <div className="d-flex flex-column align-items-center">
            <Image alt='Khách hàng Android' src="/android.png" width={60} height={60} />
            <p className="text-white mt-3 fs-6">安卓客户端</p>
          </div>
          </Link>
        </div>
        <div className="footer-middle text-center w-full">
          <div className="d-flex gap-1 justify-content-center">
            <FiMapPin className=" fs-3 me-2 text-color-main" />
            <SelectLanguageDropdown>
              <div className="option-language-dropdown">
                <CListGroup layout="horizontal" className="flex-wrap wrap-option-language">
                  {
                    _.map(languages, (item, index) => {
                      return (
                        <CListGroupItem key={index} onClick={() => selectLanguage(item)} className="cursor-pointer d-flex gap-2 align-items-center">
                          <Image alt='flag' src={item.src} width={30} height={20} />
                          <span className="text-white text-pink-hover white-space-nowrap">{item.text}</span>
                        </CListGroupItem>
                      )
                    })
                  }
                </CListGroup>
              </div>
            </SelectLanguageDropdown>

            <p>版权声明：如果来函说明本网站提供内容本人或法人版权所有。本网站在核实后，有权先行撤除，以保护版权拥有者的权益。</p>
          </div>
          <div className="my-1" >邮箱地址：<Link href="mailto:info@wyav.tv" className="text-color-main text-pink-hover">info@wyav.tv</Link></div>
          <div><span className="fw-bold">wyav.tv</span> 版权所有，未经授权禁止链接、复制或建立</div>
        </div>

        <div className="footer-bottom text-center pt-5 pb-4 w-full">
          Copyright 2021-2030 wyav.tv All rights Reserved.
        </div>
      </div>
    </div>

  );
}