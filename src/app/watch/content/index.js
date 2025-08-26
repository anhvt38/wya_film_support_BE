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
import { getInfoVideoDetail, getLanguagesPlayList, getRelatedVideo, getUserViewModel, getVideoDetail, getVideoDetailType2 } from "@/apis/detail-page";
import { useQuery } from "react-query";
import Link from "next/link";
import _ from "lodash-es";
import { convertHotView, ensureHttps, getConvertedQuery, getImgSrcByUserLevel, getSexIcon, signQuery } from "@/utils/common";
import { routes } from "@/contants/routes";
import { SecondVideoMoreDetail } from "@/components/second-video-more-detail";
import { QrDownloadInfo } from "@/components/QrDownloadInfo";
import { MainContext } from "@/layouts/MainLayout";
import DetailVideoComment from "@/components/detail-video-comment";
import PopupAuthorInfo from "@/components/popup-author-info";
import qs from 'qs';

export default function VideoDetail({ watchRoute = true, paramId }) {

  const router = useRouter();
  const pathname = usePathname();
  const { setIsOpenAuthModal, publicKey, privateKey } = useContext(MainContext);

  const searchParams = useSearchParams()
  const id = searchParams.get('v');
  const videoIdPagePlay = searchParams.get('id');
  const [params, setParams] = useState({
    cinema: 2,
    region: "SG",
    device: 1,
    ispath: true,
    alluser: 1,
    id,
    a: 1
  });

  const [secondParams, setSecondParams] = useState({
    cinema: 2,
    usersign: 1,
    region: "SG",
    device: 1,
    isMasterSupport: 1,
    id: paramId,
    a: 1
  });

  const [detailInfoParams, setDetailInfoParams] = useState({
    cinema: 2,
    device: 1,
    player: "CkPlayer",
    tech: "HLS",
    country: "HU",
    lang: "cns",
    v: 1,
    id: id || paramId,
    region: "SG",
  });

  const [relatedParams, setRelatedParams] = useState({
    cinema: 3,
    size: 15,
    set: 1,
    isNews: true,
    isav: true,
  });

  const [playRelatedParams, setPlayRelatedParams] = useState({
    cinema: 2,
    size: 10,
    set: 1,
    isav: true,
  });

  const [languagesPlayListparams, setLanguagesPlayListParams] = useState({
    cinema: 2,
    lsk: 1,
    taxis: 0,
  });


  const [viewModelParams, setviewModelParams] = useState({
    touid: 128975927
  });

  const [videoDetail, setVideoDetail] = useState({ info: [] })
  const [videoDetailType2, setVideoDetailType2] = useState({ info: [] })
  const [infoVideo, setInfoVideo] = useState({ info: [] })
  const [userViewModel, setUserViewModel] = useState({ info: [] })
  const [hasFetched, setHasFetched] = useState(false)


  useEffect(() => {
    if (hasFetched) return
    if (!id || !publicKey) return

    const convertedQuery = getConvertedQuery(
      {
        ...params,
        id: videoIdPagePlay || id,
        a: videoIdPagePlay ? 0 : 1,
      },
      publicKey,
      privateKey
    )

    getVideoDetail(convertedQuery).then(({ data }) => {
      setVideoDetail(data)
      setHasFetched(true)

    })
  }, [id, params, publicKey, privateKey, videoIdPagePlay])

  useEffect(() => {
    if (hasFetched) return
    if (!paramId || !publicKey) return

    const convertedQuery = getConvertedQuery({
      ...secondParams,
      id: videoIdPagePlay || paramId,
      a: videoIdPagePlay ? 0 : 1
    }, publicKey, privateKey)

    getVideoDetailType2(convertedQuery).then(({ data }) => {
      setVideoDetailType2(data)
      setHasFetched(true)

    })
  }, [secondParams, publicKey, privateKey, videoIdPagePlay, paramId])

  useEffect(() => {
    if (pathname == routes.watch && !!publicKey) return
    if (!paramId || !publicKey) return

    const convertedQuery = getConvertedQuery(detailInfoParams, publicKey, privateKey)

    getInfoVideoDetail(convertedQuery).then(({ data }) => {
      setInfoVideo(data)
    })
  }, [detailInfoParams, publicKey, privateKey, pathname])


  useEffect(() => {
    if (!publicKey) return

    const convertedQuery = getConvertedQuery(viewModelParams, publicKey, privateKey)

    getUserViewModel(convertedQuery).then(({ data }) => {
      setUserViewModel(data)
    })
  }, [viewModelParams, publicKey, privateKey])



  const { id: videoDetailId, flvPathList = [], title: detailVideoTitle, tags, publisher, mediaKey } = videoDetail?.info[0] || videoDetailType2.info[0] || {};
  const hlsMediaUrl = _.find(flvPathList, item => item.isHls);
  const { result } = hlsMediaUrl || {};

  const { data: languagesPlayListData }
    = useQuery({
      queryKey: ['language-play-list', languagesPlayListparams, publicKey, privateKey, id, paramId],
      queryFn: () => {
        let paramsSignQuery = qs.stringify(languagesPlayListparams);
        paramsSignQuery += `&cid=0,2,10,88&vid=${id || paramId}`
        const convertedQuery = signQuery(paramsSignQuery, publicKey, privateKey)
        return getLanguagesPlayList(convertedQuery)
      },
      enabled: !!publicKey
    })

  const { data: languagesPlayList } = languagesPlayListData || {};
  const languagesPlayListResult = languagesPlayList?.info[0].playList || [];

  let endPublisher = publisher || infoVideo?.info[0]?.publisher;
  let { id: idInfoDetail, cid, title: titleInfoDetail } = infoVideo?.info[0] || {};
  const { title, avatar, hot, gender, from, likes, slogon, videoCount, fansCount, userLevel } = endPublisher || {};

  const { data: relatedVideoDatas }
    = useQuery({
      queryKey: ['related-videos', relatedParams, playRelatedParams, publicKey, privateKey, detailVideoTitle, tags, cid, videoDetailId,titleInfoDetail, idInfoDetail] ,
      queryFn: () => {
        let convertedQuery = ``;
        if (pathname == routes.watch) {
          let paramsSignQuery = qs.stringify(relatedParams);
          paramsSignQuery += `&id=${videoDetailId}&cid=top&title=${detailVideoTitle}&tags=${tags?.join(',')}`
          convertedQuery = signQuery(paramsSignQuery, publicKey, privateKey)
        } else {
          let paramsSignQuery = qs.stringify(playRelatedParams);
          paramsSignQuery += `&cid=${cid}&title=${titleInfoDetail}&id=${idInfoDetail}`
          convertedQuery = signQuery(paramsSignQuery, publicKey, privateKey)
        }
        return getRelatedVideo(convertedQuery)
      },
      enabled: !!publicKey
    })

  const { data: relatedVideos } = relatedVideoDatas || {};


  const onToCurrentPlayList = (key) => {
    setHasFetched(false)
    router.push(`${pathname}?id=${key}`)
  }

  return (
    <div className="video-detail">
      <div className="video-detail-left">
        {
          result &&
          <>
            <Video
              mediaUrl={result}
              relatedVideos={relatedVideos?.info}
              videoDetail={videoDetail?.info[0]}
              publisher={endPublisher}
              languagesPlayList={languagesPlayListResult}
              mediaKey={mediaKey}
              onToCurrentPlayList={onToCurrentPlayList}
            />
            <VideoToolbar videoDetail={videoDetail?.info[0]} />
          </>
        }
      </div>

      <div className="video-detail-right d-flex flex-column justify-content-between">
        <Link href="https://ppt.wyav.tv/c/c?position=VPR&i=634&r=17">
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
              <PopupAuthorInfo avatar={avatar} userViewModel={userViewModel?.info[0]} />
              <div>
                <h5 className="fw-normal truncate-one-line">{title}
                  <span className="fw-bold ms-2">
                    {getSexIcon(!gender)}
                  </span>
                </h5>
                <div className="d-flex gap-3 align-items-end text-main-gray">
                  {
                    userLevel &&
                    <Image
                      alt={userLevel}
                      src={getImgSrcByUserLevel(userLevel)}
                      width={40}
                      height={19}
                      className=""
                    />
                  }

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
      <Link href="https://ppt.wyav.tv/c/c?position=VPB&i=635&r=17">
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
            : <SecondVideoMoreDetail videoDetail={infoVideo?.info[0]} videoId={paramId} />
        }
        {
          languagesPlayListResult?.length > 1 &&

          <div className="collections-bottom">
            {
              _.map(languagesPlayListResult, (item, index) => {
                return (
                  <div 
                  onClick={() => {
                    setHasFetched(false)
                    router.push(`${pathname}?id=${item.key}`)
                  }}
                  className="" 
                  key={index}>
                    <span className={mediaKey == item.key ? "text-pink" : "text-main-gray"}>{item.name}</span>
                    {
                      mediaKey == item.key &&
                      <Image alt='runing' src={"/collections-playing.gif"} width={15} height={12} />
                    }
                  </div>
                )
              })
            }
          </div>
        }

        <DetailVideoComment />
      </div>
      <div className="mt-3">
        <RelatedVideos data={relatedVideos?.info} />
      </div>
    </div>
  );
}
