"use client";

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash-es";
import {
  getStarList
} from "@/apis/homepage";
import { useQuery } from "react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { CommonPagination } from "../common-pagination";
import { routes } from "@/contants/routes";
import { ActressSkeleton } from "../skeleton/actress-skeleton";
import { ActressItem } from "../actress-item";

const LIMIT_ITEM_24_A_PAGE = 24;

export const RowCelebritiePage = (props) => {
  const { cidValue, title = "" } = props;

  const pathName = usePathname();

  const searchParams = useSearchParams();
  let orderBy = searchParams.get("orderBy");
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
    size: LIMIT_ITEM_24_A_PAGE,
    orderby: orderBy,
    // orderBy: 0,
    desc: 1,
    vv: "0bbed504ca1339001982541a104a0702",
    pub: "CJSrCJGoDZWnCIurC3auD5ybf2zCJOtBZ4tEIurD2uoDJDVOJ1YPZ8tC31XCcLYD6OoEJbbDZ4oOJ9ZC6GsDsCvDZHVOMGpD64nDJ0oDc4sOMPYCJGqEMPYOJauDJPcOMCnP36"
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

  useEffect(() => {
    const newParams = { ...params, page: page };
    setParams(newParams);
  }, [page]);


  useEffect(() => {
    const newParams = { ...params, orderby: orderBy };

    switch (Number(orderBy)) {
      case 0:
        newParams.vv = "0bbed504ca1339001982541a104a0702";
        newParams.pub =
          "CJSrCJGoDZWnCIurC3auD5ybf2zCJOtBZ4tEIurD2uoDJDVOJ1YPZ8tC31XCcLYD6OoEJbbDZ4oOJ9ZC6GsDsCvDZHVOMGpD64nDJ0oDc4sOMPYCJGqEMPYOJauDJPcOMCnP36";
        break;
      case 1:
        newParams.vv = "04b707b763d15b52149f9a71f91ecfee";
        newParams.pub =
          "CJSrCJGoDZWnCIurC3auD5ybf2zCJOtBZ4tEIurD2uoDJDVOJ1YPZ8tC31XCcLYD6OoEJbbDZ4oOJ9ZC6GsDsCvDZHVOMGpD64nDJ0oDc4sOMPYCJGqEMPYOJauDJPcOMCnP36";
        break;
      case 2:
        newParams.vv = "0d99447a47b7a4184840964206e35ff6";
        newParams.pub =
          "CJSrCJGoDZWnCIurC3auD5ybf2zCJOtBZ4tEIurD2uoDJDVOJ1YPZ8tC31XCcLYD6OoEJbbDZ4oOJ9ZC6GsDsCvDZHVOMGpD64nDJ0oDc4sOMPYCJGqEMPYOJauDJPcOMCnP36";
        break;
      case 3:
        newParams.vv = "86f72544003416c4b35e82f3d624d178";
        newParams.pub =
          "CJSrCJGoDZWnCIurC3auD5ybf2zCJOtBZ4tEIurD2uoDJDVOJ1YPZ8tC31XCcLYD6OoEJbbDZ4oOJ9ZC6GsDsCvDZHVOMGpD64nDJ0oDc4sOMPYCJGqEMPYOJauDJPcOMCnP36";
        break;
    }

    setParams(newParams);
  }, [orderBy]);

  let recordcount = 0;

  const { data: starListDatas, isLoading }
    = useQuery({
      queryKey: ['star-list'],
      queryFn: () => {
        return getStarList({
          ...params
        })
      },
    })

  const { data: starList } = starListDatas || {};

  recordcount = starList?.info[0]?.recored;

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // Calculate pagination
  const totalPages = Math.ceil(recordcount / LIMIT_ITEM_24_A_PAGE);
  const startIndex = (currentPage - 1) * LIMIT_ITEM_24_A_PAGE;
  const endIndex = startIndex + LIMIT_ITEM_24_A_PAGE;

  return (
    <div>
      <div className="tags-homepage-center-6  col-md-4">
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="0" className=" px-3">
            <p className="">
              共有 <span className="mainColor">{recordcount}</span> 个女优
            </p>
          </CListGroupItem>
        </CListGroup>
      </div>

      {
        isLoading
          ?
          <div className="actress-video-row-celebrities">
            {
              _.map(_.fill(Array(16), null), (_, index) => (
                <div key={index} className="col-6 col-sm-3">
                  <ActressSkeleton />
                </div>
              ))
            }
          </div>
          : <div className="actress-video-row-celebrities">
            {
              _.map(starList?.info[0]?.list, (item, index) => {
                return (
                  <ActressItem key={index} item={item} />
                )
              })
            }
          </div>
      }


      <div className="page-control">
        {totalPages > 1 && (
          <CommonPagination recordcount={recordcount} limitItemInPage={LIMIT_ITEM_24_A_PAGE} currentPageDefault={currentPage}></CommonPagination>
        )}
      </div>
    </div>

  );
};
