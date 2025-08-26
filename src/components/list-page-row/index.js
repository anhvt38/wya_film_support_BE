"use client";

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useContext, useEffect, useState } from "react";
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
import { MainContext } from "@/layouts/MainLayout";
import { signQuery } from "@/utils/common";
import qs from 'qs';

const LIMIT_ITEM_36_A_PAGE = 36;
const LIMIT_ITEM_35_A_PAGE = 35;
const LIMIT_ITEM_40_A_PAGE = 40;
let LIMIT_ITEM_DEFAULT_A_PAGE = 36;

export const ListPageRow = (props) => {
  const { cidValue, title = "" } = props;
  const { privateKey, publicKey } = useContext(MainContext);

  const pathName = usePathname();

  const searchParams = useSearchParams();
  let orderBy = searchParams.get("orderBy");
  let tag = searchParams.get("tag");
  let isRecommended = searchParams.get("isRecommended") || -1;
  let isMasaike = searchParams.get("isMasaike") || -1;
  let isFree = searchParams.get("isFree") || -1;
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
    // size: LIMIT_ITEM_35_A_PAGE,
    orderby: orderBy,
    // desc: 1,
    // cid: cid,
    isserial: -1,
    isIndex: isRecommended,
    isfree: isFree,
    isMasaike: isMasaike,
    // label: tag,
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
  // useEffect(() => {
  //   const newParams = { ...params, label: tag };
  //   setParams(newParams);
  // }, [tag]);

  useEffect(() => {
    const newParams = { ...params, page: page };
    setParams(newParams);
  }, [page]);

  useEffect(() => {
    const newParams = { ...params, isIndex: isRecommended };

    //for cid = svideo
    // switch (Number(isRecommended)) {
    //   case -1:
    //     newParams.vv = "acef08de11a8b259ebe7d06c5df0a8f5";
    //     newParams.pub =
    //       "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
    //     break;
    //   case 1:
    //     newParams.vv = "30c87688f4c12668a04be8008df90cec";
    //     newParams.pub =
    //       "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
    //     break;
    //   case 0:
    //     newParams.vv = "688f068a53e9af9fac71f64719f327ec";
    //     newParams.pub =
    //       "CJSqE30uD30pDoutCZasCryggQzCZ4sBZ8nE2uoCZCkDJDVOMPXOZ5XPM9ZD3WtD3KsCM4pOZ8qE3HcCZGpC3OmDpHVCM4nCp9XE3OnDZatEMGvC38uP3GrD6LaPJPZCJOsPM5";
    //     break;
    // }

    setParams(newParams);
  }, [isRecommended]);

  useEffect(() => {
    const newParams = { ...params, isMasaike: isMasaike };
    setParams(newParams);
  }, [isMasaike]);

  useEffect(() => {
    const newParams = { ...params, isfree: isFree };
    setParams(newParams);
  }, [isFree]);

  useEffect(() => {
    const newParams = { ...params, orderby: orderBy };
    setParams(newParams);
  }, [orderBy]);

  let dataVideos;
  let recordcount;

  // Định nghĩa tất cả các useQuery ở ngoài switch
  const { data: sVideoDatas } = useQuery({
    queryKey: ["get-list-search", params, "svideo", tag, publicKey, privateKey],
    queryFn: () => {
      let paramsSignQuery = qs.stringify(params);
      if (tag == null || tag == undefined || tag == '') {

      } else {
        paramsSignQuery = paramsSignQuery + `&label=` + tag;
      }

      paramsSignQuery = paramsSignQuery + `&size=` + LIMIT_ITEM_36_A_PAGE + `&cid=svideo`;
      paramsSignQuery = signQuery(paramsSignQuery, publicKey, privateKey);
      return getListSearch(paramsSignQuery, "svideo", tag)
    },
    enabled: cidValue === 'svideo',
  });

  const { data: japanDatas } = useQuery({
    queryKey: ["get-list-search", params, "japan", tag, publicKey, privateKey],
    queryFn: () => {
      let paramsSignQuery = qs.stringify(params);
      if (tag == null || tag == undefined || tag == '') {

      } else {
        paramsSignQuery = paramsSignQuery + `&label=` + tag;
      }
      paramsSignQuery = paramsSignQuery + `&size=` + LIMIT_ITEM_40_A_PAGE + `&cid=0,2,10,85`;
      paramsSignQuery = signQuery(paramsSignQuery, publicKey, privateKey);
      return getListSearchAPI8(paramsSignQuery)
    },
    enabled: cidValue === 'japan',
  });

  const { data: europeanDatas } = useQuery({
    queryKey: ["get-list-search", params, "european", tag, publicKey, privateKey],
    queryFn: () => {
      let paramsSignQuery = qs.stringify(params);
      if (tag == null || tag == undefined || tag == '') {

      } else {
        paramsSignQuery = paramsSignQuery + `&label=` + tag;
      }
      paramsSignQuery = paramsSignQuery + `&size=` + LIMIT_ITEM_40_A_PAGE + `&cid=0,2,10,86`;
      paramsSignQuery = signQuery(paramsSignQuery, publicKey, privateKey);
      return getListSearchAPI8(paramsSignQuery);
    },
    enabled: cidValue === 'european',
  });

  const { data: cartoonDatas } = useQuery({
    queryKey: ["get-list-search", params, "cartoon", tag, publicKey, privateKey],
    queryFn: () => {
      let paramsSignQuery = qs.stringify(params);
      if (tag == null || tag == undefined || tag == '') {

      } else {
        paramsSignQuery = paramsSignQuery + `&label=` + tag;
      }
      paramsSignQuery = paramsSignQuery + `&size=` + LIMIT_ITEM_40_A_PAGE + `&cid=0,2,10,88`;
      paramsSignQuery = signQuery(paramsSignQuery, publicKey, privateKey);
      return getListSearchAPI8(paramsSignQuery);
    },
    enabled: cidValue === 'cartoon',
  });

  const { data: domesticDatas } = useQuery({
    queryKey: ["get-list-search", params, "domestic", tag, publicKey, privateKey],
    queryFn: () => {
      let paramsSignQuery = qs.stringify(params);
      if (tag == null || tag == undefined || tag == '') {

      } else {
        paramsSignQuery = paramsSignQuery + `&label=` + tag;
      }
      paramsSignQuery = paramsSignQuery + `&size=` + LIMIT_ITEM_40_A_PAGE + `&cid=0,2,10,87`;
      paramsSignQuery = signQuery(paramsSignQuery, publicKey, privateKey);
      return getListSearchAPI8(paramsSignQuery);
    },
    enabled: cidValue === 'domestic',
  });

  const { data: gayDatas } = useQuery({
    queryKey: ["get-list-search", params, "gay", tag, publicKey, privateKey],
    queryFn: () => {
      let paramsSignQuery = qs.stringify(params);
      paramsSignQuery = paramsSignQuery + `&size=` + LIMIT_ITEM_36_A_PAGE + `&cid=gay`;
      paramsSignQuery = signQuery(paramsSignQuery, publicKey, privateKey);
      return getListSearch(paramsSignQuery, "gay", tag)
    },
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
      LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_40_A_PAGE;
      break;
    case 'european':
      dataVideos = europeanDatas?.data.info[0]?.result;
      recordcount = europeanDatas?.data.info[0]?.recordcount;
      LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_40_A_PAGE;
      break;
    case 'cartoon':
      dataVideos = cartoonDatas?.data.info[0]?.result;
      recordcount = cartoonDatas?.data.info[0]?.recordcount;
      LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_40_A_PAGE;
      break;
    case 'domestic':
      dataVideos = domesticDatas?.data.info[0]?.result;
      recordcount = domesticDatas?.data.info[0]?.recordcount;
      LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_40_A_PAGE;
      break;
    case 'gay':
      dataVideos = gayDatas?.data.info[0]?.result;
      recordcount = gayDatas?.data.info[0]?.recordcount;
      LIMIT_ITEM_DEFAULT_A_PAGE = LIMIT_ITEM_36_A_PAGE;
      break;
  }

  const totalPages = Math.ceil(recordcount / LIMIT_ITEM_DEFAULT_A_PAGE);
  const startIndex = (currentPage - 1) * LIMIT_ITEM_DEFAULT_A_PAGE;
  const endIndex = startIndex + LIMIT_ITEM_DEFAULT_A_PAGE;

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
          <CommonPagination recordcount={recordcount} limitItemInPage={LIMIT_ITEM_DEFAULT_A_PAGE} currentPageDefault={currentPage}></CommonPagination>
        )}
      </div>
    </div>

  );
};
