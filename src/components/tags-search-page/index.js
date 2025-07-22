"use client";

import { CButton, CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useState } from "react";
import _ from "lodash-es";
import { getMainMenus, getTagFilter } from "@/apis/homepage";
import { useQuery } from "react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { routes } from "@/contants/routes";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";

export const TagsSearchPage = (props) => {
  const { title = "" } = props;
  const pathName = usePathname();
  let arrPathName = pathName.split("/");
  const searchParams = useSearchParams();
  let tag = searchParams.get("tag");
  let orderBy = searchParams.get("orderBy");
  const [sortDirection, setSortDirection] = useState('asc');

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.delete('page');
      return params.toString()
    },
    [searchParams]
  )

  const deleteQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const excluded = [null, undefined, ''];

    const toggleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
      updateSortInUrl(newDirection);
  };

      const updateSortInUrl = useCallback((newDirection) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newDirection === 'asc') {
      params.delete('asc');
    } else {
      params.set('asc', 1);
    }
    window.history.pushState({}, '', `${pathName}?${params.toString()}`);
  }, [pathName, searchParams]);

  return (
    <div className="search-tag d-flex flex-column flex-md-row justify-content-between my-4 gap-md-2 gap-4">
      <div className="tags-search-left-1">
        {/* <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="0" className={arrPathName[2] === 'svideo' ? "small-video-active item-default" : "item-default"}>
            <Link
              href={
                routes.list + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <small className="text-pink-hover"> 小视频 </small>
            </Link>
          </CListGroupItem>
        </CListGroup>
      </div> */}
      {/* <div className="tags-homepage-center-1  col-md-8"> */}
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="0" className={arrPathName[2] === 'japan' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listJapan + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-pink-hover">视频 </span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="1" className={arrPathName[2] === 'european' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listEuropean + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-pink-hover">女优</span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="2" className={arrPathName[2] === 'cartoon' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listCartoon + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-pink-hover"> 用户 </span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="3" className={arrPathName[2] === 'domestic' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listDomestic + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-pink-hover"> 相册 </span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="4" className={arrPathName[2] === 'gay' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listGay + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-pink-hover"> 动态 </span>
            </Link>
          </CListGroupItem>
        </CListGroup>
       
      </div>
       <div className="tags-search-center-1">
          <span>五</span>
          {/* <CButton
                        
                          className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                        > */}
                          
                            <BsSortAlphaUp />
                        {/* </CButton> */}
          <p>共有 <span className="text-white">0</span> 个筛选结果</p>             
        </div>
        <div className="tags-search-right-1">
          <div className="tags-search-right-1-6">
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="1"
            className={
              excluded.includes(orderBy) ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathName + "?" + deleteQueryString("orderBy")} className="text-white item-tabs-link-1">
              <span className="text-pink-hover">匹配程度</span>
            </Link>
            {excluded.includes(orderBy)
              ? <CButton
                onClick={toggleSort}
                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
              >
                {sortDirection === 'asc'
                  ? <BsSortAlphaDown />
                  : <BsSortAlphaUp />}
              </CButton>
              : <div style={{ "margin-right": "20px" }}></div>
            }

          </CListGroupItem>

          <CListGroupItem key="2"
            className={
              orderBy == `2` ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathName + '?' + createQueryString('orderBy', `2`)} className="text-white item-tabs-link-1">
              <span className="text-pink-hover">添加时间</span>
            </Link>
            {orderBy == `2`
              ?
              <CButton
                onClick={toggleSort}
                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
              >
                {sortDirection === 'asc' ? <BsSortAlphaDown /> : <BsSortAlphaUp />}
              </CButton>
              : <div style={{ "margin-right": "20px" }}></div>
            }
          </CListGroupItem>
          <CListGroupItem key="3"
            className={
              orderBy == `3` ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathName + '?' + createQueryString('orderBy', `3`)} className="text-white item-tabs-link-1">
              <span className="text-pink-hover">人气高低</span>
            </Link>
            {orderBy == `3`
              ?
              <CButton
                onClick={toggleSort}
                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
              >
                {sortDirection === 'asc' ? <BsSortAlphaDown /> : <BsSortAlphaUp />}
              </CButton>
              : <div style={{ "margin-right": "20px" }}></div>
            }
          </CListGroupItem>
          <CListGroupItem key="4"
            className={
              orderBy == `4` ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathName + '?' + createQueryString('orderBy', `3`)} className="text-white item-tabs-link-1">
              <span className="text-pink-hover">评分高低</span>
            </Link>
            {orderBy == `3`
              ?
              <CButton
                onClick={toggleSort}
                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
              >
                {sortDirection === 'asc' ? <BsSortAlphaDown /> : <BsSortAlphaUp />}
              </CButton>
              : <div style={{ "margin-right": "20px" }}></div>
            }
          </CListGroupItem>
        </CListGroup>
      </div>
        </div>
    </div>
  );
};
