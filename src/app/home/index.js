"use client";

import dynamic from "next/dynamic";
import "./styles.scss";
import { CButton, CCol, CPopover, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
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
import { getMediaPlaylistUrl } from "@/utils/common";
import { routes } from "@/contants/routes";

export default function Home({ }) {
  const [totalMainVideo, setTotalMainVideo] = useState(12);

  const [params, setParams] = useState({
    cinema: 2,
    size: 13,
    set: 1,
    vv: "97c960306558ad063db8716ece0c87ae",
    pub: "CJSqD3aqC3CmCouvDpCnELya9QzCJOtBZ4tEIurD2uoDJDVP3KnOZGmD6PbDpCnD64oDZatP3OpCcOuE64vPMCtDpLVC6OvDZ1cCZOnDMGsDsKsOJ9aEMCoOsDZDMOsOsGpE37",
  });

  const [secondParams, setSecondParams] = useState({
    cinema: 2,
    set: 0,
    size: 8,
    vv: "7b0d04bf8c9f10cacb20d1dac8ec171a",
    pub: 1745456415377,
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
    vv: "f99ffc89e4cffbaf13f73e2e24361212",
    pub: "CJSqD3aqDZGmDYuoCp8tDrya9QzCJOtBZ4tEIurD2uoDJDVOZHaCJ0sEMCrEM9bD6GvOJavCJSrPZ1XOcPZD3CrOJ9VPZKpEM9aCsGqPM8tPc5ZPMCvE6OpP3KmCcDXPJ1"
  })


  const { data: firstAllVideoDatas, isLoading: firstIsLoading }
    = useQuery({
      queryKey: ['first-all-video', params],
      queryFn: () => {
        return getAllVideo(params)
      },
      enabled: !!params
    })

  const { data: secondAllVideoDatas, isLoading: secondIsLoading }
    = useQuery({
      queryKey: ['second-all-video', secondParams],
      queryFn: () => {
        return getAllVideoMupload(secondParams)
      },
      enabled: !!secondParams
    })


  const { data: allHotVideoTopDatas }
    = useQuery({
      queryKey: ['all-hot-video-top', hotVideoTopParams],
      queryFn: () => {
        return getAllHotVideoTop(hotVideoTopParams)
      },
    })

  const { data: newHotVideoGroupDatas, isLoading: isLoadingNewHotVideo }
    = useQuery({
      queryKey: ['new-hot-video-group'],
      queryFn: () => {
        return getNewHotVideoGroup({
          ...newHotVideoParams
        })
      },
    })

  const { data: firstAllVideo } = firstAllVideoDatas || {};
  const { data: secondAllVideo } = secondAllVideoDatas || {};
  const { data: allHotVideoTop } = allHotVideoTopDatas || {};
  const { data: newHotVideoGroups } = newHotVideoGroupDatas || {};
  const newHotVideos = newHotVideoGroups?.info[0];
  const yourFavorite = newHotVideoGroups?.info[1];
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
      <NewUploadRow
        isSlider={true}
        title="最新上传"
        data={newHotVideoDatas}
        moreList={newHotVideoMores}
        isLoading={isLoadingNewHotVideo} />
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
      <LimitVideoRow
        title={"限时免费"}
        isLoading={firstIsLoading}
        data={limitVIPList}
        moreLink={`${routes.mainList}?isFree=2`}
        isSlider={true}
      />
      <ActressVideoRow />
      <NewUploadRow
        title="猜你喜欢"
        data={yourFavoriteDatas}
        moreList={yourFavoriteMores}
        isSlider={true}
        isLoading={isLoadingNewHotVideo} />

       <NewUploadRow title={"美女"} isLoading={secondIsLoading} data={meinvList} moreLink={`${routes.list}?tag=美女`} isSameLink={true} />
      <NewUploadRow title={"萝莉"} isLoading={secondIsLoading} data={luoliList} moreLink={`${routes.list}?tag=萝莉`} isSameLink={true} />
      <NewUploadRow title={"御姐"} isLoading={secondIsLoading} data={yujieList} moreLink={`${routes.list}?tag=御姐`} isSameLink={true} />
      <NewUploadRow title={"甜美"} isLoading={secondIsLoading} data={tianmeiList} moreLink={`${routes.list}?tag=甜美`} isSameLink={true} />
      <NewUploadRow title={"清纯"} isLoading={secondIsLoading} data={qingchunList} moreLink={`${routes.list}?tag=清纯`} isSameLink={true} />

    </div>
  );
}
