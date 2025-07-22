"use client"

import Link from "next/link";
import "./styles.scss";
import { IoDiamondOutline, IoSearch } from "react-icons/io5";
import { CommonPopover } from "../common-popover";
import { CBadge, CCol, CFormInput, CListGroup, CListGroupItem, CRow } from "@coreui/react";
import { NavigationPopover } from "../navigation-popover";
import { SiSimpleanalytics } from "react-icons/si";
import { FaCloudUploadAlt, FaSearch } from "react-icons/fa";
import { PopularSearch } from "../popular-search";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp, IoMdNotifications } from "react-icons/io";
import { UpgradeVip } from "../upgrade-vip";
import { UploadVideo } from "../upload-video";
import { Watched } from "../watched";
import Image from "next/image";
import { HeaderLogin } from "../header-login";
import { useEffect, useState } from "react";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { routes } from "@/contants/routes";


export default function Header({ role }) {
  const [isHoverNavigation, setIsHoverNavigation] = useState(false);
  const [isHoverUpgradeVip, setIsHoverUpgradeVip] = useState(false);
  const [isHoverUploadVideo, setIsHoverUploadVideo] = useState(false);
  const [isHoverWatched, setIsHoverWatched] = useState(false);
  const [isHoverNotification, setIsHoverNotification] = useState(false);
  const [isHoverHeaderLogin, setIsHoverHeaderLogin] = useState(false);

      const [language, setLanguage] = useState(null);


  const onHoverBtnLogin = () => {
    const header = document.querySelector('#header');
    header.style.zIndex = '420'
  }

  const onLeaveBtnLogin = () => {
    const header = document.querySelector('#header');
    const popover = document.querySelector('.popover');

    header.style.zIndex = '390';
    if (popover) {
    popover.style.zIndex = '380';
    }

  }

      useEffect(() => {
          setLanguage(JSON.parse(localStorage.getItem('lang')))
      }, [])

  return (
    <CRow id="header" className="py-3 container m-auto px-0 position-sticky">
      <CCol md={4} className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-start gap-1">
          <Link href="/">
            <Image alt='logo' src="/images/logo-movie-crop.png" width={128} height={34} />

          </Link>
          <div>
            {
              !!language &&
              <span className="text-white border rounded px-1">{language.text}</span>
            }
          </div>
        </div>
        <div className="d-flex align-items-center gap-1 header-left-end">
          <CommonPopover content={<NavigationPopover />}
            onHover={(isHover) => setIsHoverNavigation(isHover)}

          >
            <div className="d-flex gap-1 align-items-center">
              <div className={`navigation-text fs-5 ${isHoverNavigation ? "text-pink hovered" : "text-pink-hover"}`}> 导航 </div>
              <IoIosArrowDown />
              <IoIosArrowUp className="text-pink" />

            </div>

          </CommonPopover>

          <div className="position-relative ms-3">
            <Link className="text-pink-hover fs-5" href={routes.livestreamList}>
            直播
            </Link>
            <CBadge className="position-absolute bg-pink bottom-50 fw-normal px-2 py-1 fs-6">新</CBadge>

          </div>
        </div>
      </CCol>

      <CCol md={4} className="d-flex align-items-center">
        <div className="position-relative header-search d-flex align-items-center gap-4">
          <input
            type='text'
            placeholder="少妇白洁3"
            className="border-0 fs-6 w-full h-full bg-transparent text-white"
          />
          <div className="d-flex gap-3 align-items-center">

            <Link href="https://www.wyav.tv/rank" className="d-flex">
              <BiSolidBarChartAlt2 className="wrap-search-icon" />
            </Link>

            <FaSearch className="wrap-search-icon cursor-pointer"  />

          </div>

          <div className="position-absolute wrap-popular-search">
            <PopularSearch />
          </div>
        </div>
      </CCol>

      <CCol md={4} className="d-flex">
        <div className="header-right ">
          <CommonPopover
            content={<UpgradeVip />}
            onHover={(isHover) => setIsHoverUpgradeVip(isHover)}
          >
            <div className=" header-icon-group">
              <IoDiamondOutline className={isHoverUpgradeVip ? "hovered" : ""} />
              <span className={isHoverUpgradeVip ? "hovered" : ""}>升级VIP</span>
            </div>
          </CommonPopover>

          <CommonPopover content={<UploadVideo />}
            onHover={(isHover) => setIsHoverUploadVideo(isHover)}

          >
            <div className=" header-icon-group">
              <FaCloudUploadAlt className={isHoverUploadVideo ? "hovered" : ""} />
              <span className={isHoverUploadVideo ? "hovered" : ""}>上传</span>
            </div>
          </CommonPopover>


          <CommonPopover content={<Watched />}
            onHover={(isHover) => setIsHoverWatched(isHover)}

          >
            <div className=" header-icon-group">
              <FaClockRotateLeft className={isHoverWatched ? "hovered" : ""} />
              <span className={isHoverWatched ? "hovered" : ""}>看过</span>
            </div>
          </CommonPopover>


          <CommonPopover 
          // content={<NavigationPopover />}
            onHover={(isHover) => setIsHoverNotification(isHover)}

          >
            <div className=" header-icon-group">
              <IoMdNotifications className={isHoverNotification ? "hovered" : ""} />
              <span className={isHoverNotification ? "hovered" : ""}>通知</span>
            </div>
          </CommonPopover>
        </div>
        <div>
          <CommonPopover content={<HeaderLogin />}
            onHover={(isHover) => setIsHoverHeaderLogin(isHover)}

          >
            <div className="d-flex gap-2 align-items-center cursor-pointer header-login-btn" 
            onMouseMove={onHoverBtnLogin}
            onMouseLeave={onLeaveBtnLogin}
            >
              <Image alt='avatar' src="/logon.png" width={30} height={30}  className={isHoverHeaderLogin ? "hovered" : ""} />
              <span className={`whitespace-nowrap text-white ${isHoverHeaderLogin ? "hovered" : ""}`}>登录</span>
            </div>
          </CommonPopover>
        </div>
      </CCol>
    </CRow>
  )
}