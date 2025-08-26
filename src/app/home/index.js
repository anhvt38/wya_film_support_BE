"use client";

import dynamic from "next/dynamic";
import "./styles.scss";
import { CButton, CCol, CPopover, CRow } from "@coreui/react";
import { useContext, useEffect, useState } from "react";
import { CommonPopover } from "@/components/common-popover";
import { NewUploadRow } from "@/components/new-upload-row";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NightLivestreamRow } from "@/components/night-livestream-row";
import { CategoryVideoRow } from "@/components/category-video-row";
import { ActressVideoRow } from "@/components/actress-video-row";
import { ActressAlbumRow } from "@/components/actress-album-row";
import { TagsHomepage } from "@/components/tags-homepage";
import { getAllHotVideoTop, getAllVideo, getAllVideoMupload, getNewHotVideoGroup } from "@/apis/homepage";
import { useQuery } from "react-query";
import { HotVideoSidebar } from "@/components/hot-video-sidebar";
import _ from "lodash-es";
import { LimitVideoRow } from "@/components/limit-video-row";
import PreviewVideoItem from "@/components/preview-video-item";
import { getConvertedQuery, getMediaPlaylistUrl } from "@/utils/common";
import { routes } from "@/contants/routes";
import { MainContext } from "@/layouts/MainLayout";

export default function Home({ }) {
  const { privateKey, publicKey } = useContext(MainContext);

  const [totalMainVideo, setTotalMainVideo] = useState(12);

  const [params, setParams] = useState({
    cinema: 2,
    size: 13,
    set: 1,
  });

  const [secondParams, setSecondParams] = useState({
    cinema: 2,
    set: 0,
    size: 8,
  });

  const [hotVideoTopParams, sethotVideoTopParams] = useState({
    cinema: 2,
    pageSize: 10,
    cacheable: 1,
  });

  const [newHotVideoParams, setNewHotVideoParams] = useState({
    size: 43,
    isNews: 1,
    cinema: 2,
  })

  const [newHotVideoGroups, setNewHotVideoGroups] = useState({ info: [] });
  const [allHotVideoTop, setAllHotVideoTop] = useState({});
  const [secondAllVideo, setSecondAllVideo] = useState({ info: [] });
  const [firstAllVideo, setFirstAllVideo] = useState({ info: [] });
  const [hasFetchedNewHot, setHasFetchedNewHot] = useState(false);
  const [hasFetchedAllHot, setHasFetchedAllHot] = useState(false);
  const [hasFetchedAllVideo, setHasFetchedAllVideo] = useState(false);
  const [hasFetchedSecondAllVideo, setHasFetchedSecondAllVideo] = useState(false);
  const [firstIsLoading, setFirstIsLoading] = useState(false);
  const [secondIsLoading, setSecondIsLoading] = useState(false);
  const [isLoadingNewHotVideo, setIsLoadingNewHotVideo] = useState(false);

  useEffect(() => {
    if (hasFetchedNewHot) return
    setIsLoadingNewHotVideo(true)
    const convertedQuery = getConvertedQuery(newHotVideoParams, publicKey, privateKey)

    getNewHotVideoGroup(convertedQuery).then(({ data }) => {
      setNewHotVideoGroups(data)
      setHasFetchedNewHot(true);
      setIsLoadingNewHotVideo(false)
    })
  }, [newHotVideoParams, publicKey, privateKey])


  useEffect(() => {
    if (hasFetchedAllHot) return

    getAllHotVideoTop(hotVideoTopParams).then(({ data }) => {
      setAllHotVideoTop(data)
      setHasFetchedAllHot(true);
    })
  }, [hotVideoTopParams])

  useEffect(() => {
    if (hasFetchedSecondAllVideo) return
    setSecondIsLoading(true)
    const convertedQuery = getConvertedQuery(secondParams, publicKey, privateKey)

    getAllVideoMupload(convertedQuery).then(({ data }) => {
      setSecondAllVideo(data)
      setHasFetchedSecondAllVideo(true);
      setSecondIsLoading(false)
    })
  }, [secondParams, publicKey, privateKey])

  useEffect(() => {
    if (hasFetchedAllVideo) return
    setFirstIsLoading(true)
    const convertedQuery = getConvertedQuery(params, publicKey, privateKey)

    getAllVideo(convertedQuery).then(({ data }) => {
      setFirstAllVideo(data)
      setHasFetchedAllVideo(true);
      setFirstIsLoading(false)
    })
  }, [params, publicKey, privateKey])


  const newHotVideos = newHotVideoGroups?.info[0] || [];
  const yourFavorite = newHotVideoGroups?.info[1] || [];
  const newHotVideoDatas = _.dropRight(newHotVideos, 5);
  const newHotVideoMores = _.takeRight(newHotVideos, 4);
  const yourFavoriteDatas = _.dropRight(yourFavorite, 5);
  const yourFavoriteMores = _.takeRight(yourFavorite, 4);

  const {
    cartoonList,
    domesticList,
    europeanList,
    japanList,
    selfLordList,
    limitVIPList,
    vrList,
  } = firstAllVideo?.info[0] || {};

  const { tianmeiList, yujieList, luoliList, meinvList, qingchunList } =
    secondAllVideo?.info[0] || {};
  const japanCid = `0,2,10,85`;
  const europeCid = `0,2,10,86`;
  const cartoonCid = `0,2,10,88`;
  const domesticCid = `0,2,10,87`;

  const allHotVideoJapan = _.find(
    allHotVideoTop?.info,
    (item) => item.cid == japanCid
  );
  const allHotVideoEurope = _.find(
    allHotVideoTop?.info,
    (item) => item.cid == europeCid
  );
  const allHotVideoCartoon = _.find(
    allHotVideoTop?.info,
    (item) => item.cid == cartoonCid
  );
  const allHotVideoDomestic = _.find(
    allHotVideoTop?.info,
    (item) => item.cid == domesticCid
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1912) setTotalMainVideo(12)
      else if (width >= 1679) setTotalMainVideo(10)
      else if (width >= 1440) setTotalMainVideo(12)
      else if (width >= 1280) setTotalMainVideo(10)

    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="homepage">
      {
        newHotVideoDatas && newHotVideoDatas?.length &&
        <NewUploadRow
          isSlider={true}
          title="最新上传"
          data={newHotVideoDatas}
          moreList={newHotVideoMores}
          isLoading={isLoadingNewHotVideo}
        />
      }

      <NightLivestreamRow />
      <TagsHomepage />
      <ActressAlbumRow />
      <CRow className="wrap-main-videos">
        <div className="main-videos">
          <CategoryVideoRow
            title={"日本"}
            isLoading={firstIsLoading}
            data={japanList?.slice(0, totalMainVideo)}
            isShowDropdown={true}
          />
        </div>
        <div className="rank-hot mt-5 ps-4">
          <HotVideoSidebar
            title="日本·排行榜"
            data={allHotVideoJapan?.rankList}
            listLink={routes.rankJapanKorea18}
          />
        </div>
      </CRow>
      <CRow className="wrap-main-videos">
        <div className="main-videos">
          <CategoryVideoRow
            title={"欧美"}
            isLoading={firstIsLoading}
            data={europeanList?.slice(0, totalMainVideo)}
          />
        </div>
        <div className="rank-hot mt-5 ps-4">
          <HotVideoSidebar
            title="欧美·排行榜"
            data={allHotVideoEurope?.rankList}
            listLink={routes.rankWestern18}
          />
        </div>
      </CRow>
      <CRow className="wrap-main-videos">
        <div className="main-videos">
          <CategoryVideoRow
            title={"卡通"}
            isLoading={firstIsLoading}
            data={cartoonList?.slice(0, totalMainVideo)}
          />
        </div>
        <div className="rank-hot mt-5 ps-4">
          <HotVideoSidebar
            title="卡通·排行榜"
            data={allHotVideoCartoon?.rankList}
            listLink={routes.rankCartoon18}
          />
        </div>
      </CRow>
      <CRow className="wrap-main-videos">
        <div className="main-videos">
          <CategoryVideoRow
            title={"国产"}
            isLoading={firstIsLoading}
            data={domesticList?.slice(0, totalMainVideo)}
          />
        </div>
        <div className="rank-hot mt-5 ps-4">
          <HotVideoSidebar
            title="国产·排行榜"
            data={allHotVideoDomestic?.rankList}
            listLink={routes.rankChina18}
          />
        </div>
      </CRow>
      {
        limitVIPList && limitVIPList?.length &&
        <LimitVideoRow
          title={"限时免费"}
          isLoading={firstIsLoading}
          data={limitVIPList}
          moreLink={`${routes.mainList}?isFree=2`}
          isSlider={true}
        />
      }

      <ActressVideoRow />
      {
        yourFavoriteDatas && yourFavoriteDatas?.length &&
        <NewUploadRow
          title="猜你喜欢"
          data={yourFavoriteDatas}
          moreList={yourFavoriteMores}
          isSlider={true}
          isLoading={isLoadingNewHotVideo}
        />
      }

      <NewUploadRow title={"美女"} isLoading={secondIsLoading} data={meinvList} moreLink={`${routes.list}?tag=美女`} isSameLink={true} />
      <NewUploadRow title={"萝莉"} isLoading={secondIsLoading} data={luoliList} moreLink={`${routes.list}?tag=萝莉`} isSameLink={true} />
      <NewUploadRow title={"御姐"} isLoading={secondIsLoading} data={yujieList} moreLink={`${routes.list}?tag=御姐`} isSameLink={true} />
      <NewUploadRow title={"甜美"} isLoading={secondIsLoading} data={tianmeiList} moreLink={`${routes.list}?tag=甜美`} isSameLink={true} />
      <NewUploadRow title={"清纯"} isLoading={secondIsLoading} data={qingchunList} moreLink={`${routes.list}?tag=清纯`} isSameLink={true} />

    </div>
  );
}
