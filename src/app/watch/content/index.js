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
import { convertHotView, ensureHttps } from "@/utils/common";
import { routes } from "@/contants/routes";
import { SecondVideoMoreDetail } from "@/components/second-video-more-detail";
import { QrDownloadInfo } from "@/components/QrDownloadInfo";
import { MainContext } from "@/layouts/MainLayout";
import DetailVideoComment from "@/components/detail-video-comment";
import PopupAuthorInfo from "@/components/popup-author-info";

export default function VideoDetail({ watchRoute = true, paramId }) {
  const [totalMainVideo, setTotalMainVideo] = useState(12);
  const pathname = usePathname();
    const { setIsOpenAuthModal } = useContext(MainContext);

  const searchParams = useSearchParams()
  const id = searchParams.get('v');
  const [params, setParams] = useState({
    cinema: 2,
    id: `2Tr71n7j3K9`,
    a: 1,
    region: "SG",
    device: 1,
    ispath: true,
    alluser: 1,
    vv: "8875f1099796fd69d64bfef439f0653c",
    pub: "CJSqE3CqDZ0pDYupEJOsCLyfewzCpSkCJ8mBZ4rCIuoCbyQcvgocXaQc38Q6ncQCHkPCHcmcRCmiPWRi9iP6viRiYzCMLbOMDcCZWpOc8sOMGvC3aqOs9bOpOrCM4mOZ9bPZ3",

  });

  const [secondParams, setSecondParams] = useState({
    cinema: 2,
    id: "krc7pagzYw3",
    a: 1,
    usersign: 1,
    region: "SG",
    device: 1,
    isMasterSupport: 1,
    vv: "db6f2208d6eca24bbbec622dd749c5a6",
    pub: 1748387071091

  });

  const [detailInfoParams, setDetailInfoParams] = useState({
    cinema: 2,
    device: 1,
    player: "CkPlayer",
    tech: "HLS",
    country: "HU",
    lang: "cns",
    v: 1,
    id: `krc7pagzYw3`,
    region: "SG",
    vv: "86d96ce5e28083b35c41e155e153d0d8",
    pub: "CJSqE3CvDpKmDouoCJatNrPENp8qC38wE30mEZOoC6KwCMOqE3fbE6DZEZHZEJSwCpbbCZevC65aNsCoDZ0nEMOuDJ4vDpGuDJKvCMLaOp0nDcGvPcKrDZKoNpDZDZ4qC38rOZSuCJ8qDJ5bD6DaEJSpPZKpPZXcOMKv",

  });

  const [relatedParams, setRelatedParams] = useState({
    cinema: 3,
    cid: "top",
    title: "约操兼职少妇最后被发现在偷拍",
    size: 15,
    set: 1,
    isNews: true,
    id: 35628,
    tags: "人妻,小姐",
    isav: true,
    vv: "fb4395a8701a65b63064cc30659f2644",
    pub: "CJSqE3CpC3WuDYurD3OmDryh9ozCZGmCZeuC30wDZ8mPJenPZGuEZCuEMGwDZKpPJfZDsHZEc9ZCpPVOsDbCp5cCcKsDpHYD35aE3aoE6LbC6GqCJOoEJ5YCcPVPZSqDZWoDZKnCMDZOZPZEJSoDpWtD3WuDZCqDcDZPM2"
  });

  const { data: videoDetailType2Data }
    = useQuery({
      queryKey: ['video-detail-type-2', secondParams],
      queryFn: () => {
        return getVideoDetailType2(secondParams)
      },
      enabled: !!paramId && !id
    })

  const { data: videoDetailData }
    = useQuery({
      queryKey: ['video-detail', params],
      queryFn: () => {
        return getVideoDetail(params)
      },
      enabled: !paramId && !!id
    })

  const { data: infoVideoData }
    = useQuery({
      queryKey: ['info-video', detailInfoParams],
      queryFn: () => {
        return getInfoVideoDetail(detailInfoParams)
      },
      enabled: pathname != routes.watch
    })

  const { data: videoDetail } = videoDetailData || {};
  const { data: videoDetailType2 } = videoDetailType2Data || {};
  const { data: infoVideo } = infoVideoData || {};

  const { info } = videoDetail || videoDetailType2 || {};
  const { flvPathList = [] } = (info && info[0]) || {};
  const hlsMediaUrl = _.find(flvPathList, item => item.isHls);
  const { result } = hlsMediaUrl || {};

  const { data: relatedVideoDatas }
    = useQuery({
      queryKey: ['related-videos', relatedParams],
      queryFn: () => {
        return getRelatedVideo(relatedParams)
      },
    })

  const { data: relatedVideos } = relatedVideoDatas || {};
  const { publisher } = (info && info[0]) || {};
  let endPublisher = publisher || infoVideo?.info[0].publisher;
  const { title, avatar, hot, gender, from, likes, slogon, videoCount, fansCount } = endPublisher || {};

  return (
    <div className="video-detail">
      <div className="video-detail-left">
        {
          result &&
          <>
            <Video mediaUrl={result} id={id} paramId={paramId} relatedVideos={relatedVideos?.info} videoDetail={videoDetail?.info[0]} publisher={endPublisher} />
            <VideoToolbar videoDetail={videoDetail?.info[0]} />
          </>
        }
      </div>
      <div className="video-detail-right d-flex flex-column justify-content-between">
        <Link href="/">
          <div className="ads-top-detail">
            <span>广告</span>
            <Image
              alt='ads'
              src="/ads-test.jpg"
              width={0}
              height={0}
              sizes="100vw"
              className=""
            />
          </div>
        </Link>
        <div className="author-info">
          <div className="d-flex justify-content-between align-items-center">

            <div className="d-flex gap-4 position-relative">
              <PopupAuthorInfo avatar={avatar} endPublisher={endPublisher} />
              <div>
                <h5 className="fw-normal truncate-one-line">{title}
                  <IoMaleFemaleOutline className="text-blue fw-bold ms-2" />
                </h5>
                <div className="d-flex gap-3 align-items-end text-main-gray">
                  <Image
                    alt='vip1'
                    src="/level/lv_1.png"
                    width={40}
                    height={19}
                    className=""
                  />
                  <FaMapMarkerAlt />
                  <span style={{ marginBottom: "-2px" }}>{from}</span>
                </div>
              </div>
            </div>
            <CButton className="bg-pink text-white rounded-0 px-3 py-1" onClick={() => setIsOpenAuthModal(true)}>+ 关注</CButton>

          </div>
          <hr />
          <div className="d-flex gap-5">
            <span>粉丝: {fansCount}</span>
            <span>作品: {videoCount}</span>
            <span>获赞: {convertHotView(likes)}</span>
          </div>
        </div>
      </div>
      <Link href="/">
        <div className="ads-bottom-video">
          <Image
            alt='ads'
            src="/ads-bottom-video.jpg"
            width={0}
            height={0}
            sizes="100vw"
            className=""
          />
          <span>广告</span>
        </div>
      </Link>

      <QrDownloadInfo />

      <div className="mt-3">
        {
          pathname == routes.watch
            ? <VideoMoreDetail videoDetail={videoDetail?.info[0]} />
            : <SecondVideoMoreDetail videoDetail={infoVideo?.info[0]} />
        }
        <div className="collections-bottom">
            <div className="">
                <span className="text-pink">1</span>
                <Image alt='runing' src={"/collections-playing.gif"} width={15} height={12} />
            </div>
            <div className="">
                <span className="text-main-gray">2</span>
            </div>
        </div>

        <DetailVideoComment />
      </div>
      <div className="mt-3">
        <RelatedVideos data={relatedVideos?.info} />
      </div>
    </div>
  );
}
