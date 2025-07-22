"use client";

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash-es";
import {
  getListSearch,
  getListSearchAPI8
} from "@/apis/homepage";
import { useQuery } from "react-query";
import { ListPageItemRow } from "../list-page-item-row";
import { usePathname, useSearchParams } from "next/navigation";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { CommonPagination } from "../common-pagination";
import { routes } from "@/contants/routes";
import { MainVideoItem } from "../main-video-item";

const LIMIT_ITEM_36_A_PAGE = 36;
const LIMIT_ITEM_35_A_PAGE = 35;
let LIMIT_ITEM_DEFAULT_A_PAGE = 36;

export const ListPageRow = (props) => {
  const { cidValue, title = "" } = props;

  const pathName = usePathname();

  const searchParams = useSearchParams();
  let orderBy = searchParams.get("orderBy");
  let tag = searchParams.get("tag");
  let isRecommended = searchParams.get("isRecommended");
  let isMasaike = searchParams.get("isMasaike");
  let isFree = searchParams.get("isFree");
  let isSortAsc = searchParams.get("asc");
  let page = searchParams.get("page");
  const excluded = [null, undefined, ''];
  if (excluded.includes(orderBy)) {
    orderBy = 0;
  }

  const currentPage = Number(searchParams.get("page") || 1);

  const createQueryString = useCallback(
    (params) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([name, value]) => {
        if (value === null) {
          newParams.delete(name);
        } else {
          newParams.set(name, value);
        }
      });
      return newParams.toString();
    },
    [searchParams]
  );

  const [params, setParams] = useState({
    cinema: 2,
    page: 1,
    size: LIMIT_ITEM_35_A_PAGE,
    orderby: orderBy,
    desc: 1,
    // cid: cid,
    isserial: -1,
    isIndex: -1,
    isfree: -1,
    isMasaike: -1,
    // vv: "b89b09a9a0c7637abe2c622e39df62c4",
    // pub: "CJSqDZ8tD34uDouqDZavCLya9QzCJOtBZ4tEIurD2uoDJDVE3CnD6DbE3CmD6PcD3OqC3WuOcLcEMDYD31YE3SqC6HVD38tE3XaEJGnCpTaDc9bCZXZPM9cD3GtPc8uDJKuEM6",
  });


  if (Number(isSortAsc) == 1) {
    params.desc = 0;
  } else {
    params.desc = 1;
  }

  if (Number(page) > 1) {
    params.page = page;
  } else {
    params.page = 1;
  }

  useEffect(() => {
    setParams({
      ...params,
      page: currentPage
    })
  }, [currentPage])

  // Update params when params changes
  useEffect(() => {
    const newParams = { ...params, label: tag };
    setParams(newParams);
  }, [tag]);

  useEffect(() => {
    const newParams = { ...params, page: page };
    setParams(newParams);
  }, [page]);

  useEffect(() => {
    const newParams = { ...params, isIndex: isRecommended };

    //for cid = svideo
    switch (Number(isRecommended)) {
      case -1:
        newParams.vv = "acef08de11a8b259ebe7d06c5df0a8f5";
        newParams.pub =
          "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
        break;
      case 1:
        newParams.vv = "30c87688f4c12668a04be8008df90cec";
        newParams.pub =
          "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
        break;
      case 0:
        newParams.vv = "688f068a53e9af9fac71f64719f327ec";
        newParams.pub =
          "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
        break;
    }

    setParams(newParams);
  }, [isRecommended]);

  useEffect(() => {
    const newParams = { ...params, isMasaike: isMasaike };

    //for cid = svideo
    switch (Number(isMasaike)) {
      case -1:
        newParams.vv = "0c1c30e3e784b5c9ac960297766fda1f";
        newParams.pub =
          "CJSqE34tCpGsD2unEJ8mD5yggQzDZKkD3akCpWkCJGoNpOsCJauCsLXCJSvPJGvE35XC3XbP39bDcKqOZCoDJKmNs9bOJSmE3anC3PcDZWqC35ZEJDYP6OoDMOsCcCoDpXX";
        break;
      case 1:
        newParams.vv = "21dc7a838fd5cb486cc63288e31a6113";
        newParams.pub =
          "CJSqE34tCpGsD2unEJ8mD5yggQzDZKkD3akCpWkCJGoNpOsCJauCsLXCJSvPJGvE35XC3XbP39bDcKqOZCoDJKmNs9bOJSmE3anC3PcDZWqC35ZEJDYP6OoDMOsCcCoDpXX";
        break;
      case 0:
        newParams.vv = "bc2ec224e67afc87a3989a9ccc9a920c";
        newParams.pub =
          "CJSqE34tCpGsD2unEJ8mD5yggQzDZKkD3akCpWkCJGoNpOsCJauCsLXCJSvPJGvE35XC3XbP39bDcKqOZCoDJKmNs9bOJSmE3anC3PcDZWqC35ZEJDYP6OoDMOsCcCoDpXX";
        break;
    }

    setParams(newParams);
  }, [isMasaike]);

  useEffect(() => {
    const newParams = { ...params, isfree: isFree };
    //for cid = svideo
    switch (Number(isFree)) {
      case -1:
        newParams.vv = "0c1c30e3e784b5c9ac960297766fda1f";
        newParams.pub =
          "CJSqE34tCpGsD2unEJ8mD5yggQzDZKkD3akCpWkCJGoNpOsCJauCsLXCJSvPJGvE35XC3XbP39bDcKqOZCoDJKmNs9bOJSmE3anC3PcDZWqC35ZEJDYP6OoDMOsCcCoDpXX";
        break;
      case 1:
        newParams.vv = "9d5900e4ffb8b3f31bf4283434667ac0";
        newParams.pub =
          "CJSqE34tCpGsD2unEJ8mD5yggQzDZKkD3akCpWkCJGoNpOsCJauCsLXCJSvPJGvE35XC3XbP39bDcKqOZCoDJKmNs9bOJSmE3anC3PcDZWqC35ZEJDYP6OoDMOsCcCoDpXX";
        break;
      case 0:
        newParams.vv = "f7c49e3f1c08c6187568634b60be10b5";
        newParams.pub =
          "CJSqE34tCpGsD2unEJ8mD5yggQzDZKkD3akCpWkCJGoNpOsCJauCsLXCJSvPJGvE35XC3XbP39bDcKqOZCoDJKmNs9bOJSmE3anC3PcDZWqC35ZEJDYP6OoDMOsCcCoDpXX";
        break;
      case 2:
        newParams.vv = "f30b347ce50e1309fce407af45070fdc";
        newParams.pub =
          "CJSqE34tCpGsD2unEJ8mD5yggQzDZKkD3akCpWkCJGoNpOsCJauCsLXCJSvPJGvE35XC3XbP39bDcKqOZCoDJKmNs9bOJSmE3anC3PcDZWqC35ZEJDYP6OoDMOsCcCoDpXX";
        break;
    }

    setParams(newParams);
  }, [isFree]);

  useEffect(() => {
    const newParams = { ...params, orderby: orderBy };

    //for cid = svideo
    switch (Number(orderBy)) {
      case 0:
        newParams.vv = "01c434eed239b9da04230818034cd17f";
        newParams.pub =
          "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
        break;
      case 2:
        newParams.vv = "948a4fac99760224c2f4e9f828fe8312";
        newParams.pub =
          "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
        break;
      case 3:
        newParams.vv = "8064a6422ab8f0461c0815231d14f4a6";
        newParams.pub =
          "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
        break;
    }

    setParams(newParams);
  }, [orderBy]);

  let dataVideos;
  let recordcount;

  // Định nghĩa tất cả các useQuery ở ngoài switch
const { data: sVideoDatas } = useQuery({
  queryKey: ["get-list-search", params, "svideo", tag],
  queryFn: () => getListSearch(params, "svideo", tag),
  enabled: cidValue === 'svideo',
});

const { data: japanDatas } = useQuery({
  queryKey: ["get-list-search", params, "japan", tag],
  queryFn: () =>
    getListSearchAPI8(
      {
        ...params,
        size: LIMIT_ITEM_35_A_PAGE,
        vv: "8a3c3c8297707a7dabbfda6493069a54",
        pub: "1748335576723",
      },
      '0,2,10,85',
      tag
    ),
  enabled: cidValue === 'japan',
});

const { data: europeanDatas } = useQuery({
  queryKey: ["get-list-search", params, "european", tag],
  queryFn: () =>
    getListSearchAPI8(
      {
        ...params,
        size: LIMIT_ITEM_35_A_PAGE,
        vv: "729be9da6811dd54becdbedeffd641b9",
        pub:
          "CJSqE3CpE3CuCounE34mD5ya9QzCJOtBZ4tEIurD2uoDJDVPJDaE6GqDpLaPJCoD69aCpWrOp4oE30pDJLYDpOmCZLVDJbXC31ZOs5aEJ0nEJHaDJ1XOpKrDpGuP65XP68qCp2",
      },
      '0,2,10,86',
      tag
    ),
  enabled: cidValue === 'european',
});

const { data: cartoonDatas } = useQuery({
  queryKey: ["get-list-search", params, "cartoon", tag],
  queryFn: () =>
    getListSearchAPI8(
      {
        ...params,
        size: LIMIT_ITEM_35_A_PAGE,
        vv: "20d429f013d929af1d39defd4bba5ddd",
        pub:
          "CJSqE3CpE3CuCounE34mD5ya9QzCJOtBZ4tEIurD2uoDJDVPJDaE6GqDpLaPJCoD69aCpWrOp4oE30pDJLYDpOmCZLVDJbXC31ZOs5aEJ0nEJHaDJ1XOpKrDpGuP65XP68qCp2",
      },
      '0,2,10,88',
      tag
    ),
  enabled: cidValue === 'cartoon',
});

const { data: domesticDatas } = useQuery({
  queryKey: ["get-list-search", params, "domestic", tag],
  queryFn: () =>
    getListSearchAPI8(
      {
        ...params,
        size: LIMIT_ITEM_35_A_PAGE,
        vv: "03d7c7794244c7b77c06a791553bec6e",
        pub:
          "CJSqE3GnCpKqDoumD3GsD5ya9QzCJOtBZ4tEIurD2uoDJDVP3baCsGuOp4vDp1cD34oPJWrOcCnP3PbC3SrE35cPJPVDpCrDsGtCp8mDpSuE6HZOZKnOZ0nD3TXOpDbOJ4qCJ5",
      },
      '0,2,10,87',
      tag
    ),
  enabled: cidValue === 'domestic',
});

const { data: gayDatas } = useQuery({
  queryKey: ["get-list-search", params, "gay", tag],
  queryFn: () => getListSearch(params, "gay", tag),
  enabled: cidValue === 'gay',
});

// console.log( sVideoDatas?.data.info[0]?.result, ' sVideoDatas?.data.info[0]?.result')

// Gán data & recordcount theo cidValue
switch (cidValue) {
  case 'svideo':
    dataVideos = sVideoDatas?.data.info[0]?.result;
    recordcount = sVideoDatas?.data.info[0]?.recordcount;
    LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_36_A_PAGE;
    break;
  case 'japan':
    dataVideos = japanDatas?.data.info[0]?.result;
    recordcount = japanDatas?.data.info[0]?.recordcount;
    LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_35_A_PAGE;
    break;
  case 'european':
    dataVideos = europeanDatas?.data.info[0]?.result;
    recordcount = europeanDatas?.data.info[0]?.recordcount;
    LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_35_A_PAGE;
    break;
  case 'cartoon':
    dataVideos = cartoonDatas?.data.info[0]?.result;
    recordcount = cartoonDatas?.data.info[0]?.recordcount;
    LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_35_A_PAGE;
    break;
  case 'domestic':
    dataVideos = domesticDatas?.data.info[0]?.result;
    recordcount = domesticDatas?.data.info[0]?.recordcount;
    LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_35_A_PAGE;
    break;
  case 'gay':
    dataVideos = gayDatas?.data.info[0]?.result;
    recordcount = gayDatas?.data.info[0]?.recordcount;
    LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_35_A_PAGE;
    break;
}

  const totalPages = Math.ceil(recordcount / 36);
  const startIndex = (currentPage - 1) * 36;
  const endIndex = startIndex + 36;

  return (
    <div>
      <div className="tags-homepage-center-6  col-md-4">
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="0" className=" px-3">
            <Link href="#" className="">
              共有 <span className="text-white">{recordcount}</span> 个筛选结果
            </Link>
          </CListGroupItem>
        </CListGroup>
      </div>
      <div className="tags-home-rank-6">
        <BiSolidBarChartAlt2 className="wrap-search-icon" />
        <a className="home-rank-link" target="_blank" title="排行榜" href={routes.rankAll}>排行</a>
      </div>
      <div className="actress-video-row">
        {cidValue == 'svideo' && (
          _.map(dataVideos, (item, index) => {
            return <ListPageItemRow key={index} item={item} />;
          })
        )}
      </div>
      <div className="actress-video-japan-row">
        {cidValue == 'japan' && (
          _.map(dataVideos, (item, index) => {
            return (
              <MainVideoItem key={index} item={item} />
            );
          })
        )}
      </div>
      <div className="actress-video-japan-row">
        {cidValue == 'european' && (
          _.map(dataVideos, (item, index) => {
            return (
              <MainVideoItem key={index} item={item} />
            );
          })
        )}
      </div>
      <div className="actress-video-japan-row">
        {cidValue == 'cartoon' && (
          _.map(dataVideos, (item, index) => {
            return (
              <MainVideoItem key={index} item={item} />
            );
          })
        )}
      </div>
      <div className="actress-video-japan-row">
        {cidValue == 'domestic' && (
          _.map(dataVideos, (item, index) => {
            return (
              <MainVideoItem key={index} item={item} />
            );
          })
        )}
      </div>
      <div className="actress-video-row">
        {cidValue == 'gay' && (
          _.map(dataVideos, (item, index) => {
            return <ListPageItemRow key={index} item={item} />;
          })
        )}
      </div>
      <div className="page-control">
        {/* Pagination */}
        {totalPages > 1 && (
          <CommonPagination recordcount={recordcount} limitItemInPage={LIMIT_ITEM_DEFAULT_A_PAGE} currentPageDefault= {currentPage}></CommonPagination>
        )}
      </div>
    </div>

  );
};
