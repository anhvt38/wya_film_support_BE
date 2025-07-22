"use client";

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useState } from "react";
import _ from "lodash-es";
import { getMainMenus, getTagFilter } from "@/apis/homepage";
import { useQuery } from "react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { routes } from "@/contants/routes";

export const TagsSmallVideoListPage = (props) => {
  const { title = "" } = props;
  const pathName = usePathname();
  let arrPathName = pathName.split("/");
  const searchParams = useSearchParams();
  let tag = searchParams.get("tag");

  const deleteQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );
  // const [params, setParams] = useState({
  //   cinema: 2,
  //   cid: "0,2,10",
  //   vv: "6e0e0d0fff56447dd1c8b456b076cf54",
  //   pub: "CJSqD3aqDZGmDYuoCp8tDrya9QzCJOtBZ4tEIurD2uoDJDVOZHaCJ0sEMCrEM9bD6GvOJavCJSrPZ1XOcPZD3CrOJ9VPZKpEM9aCsGqPM8tPc5ZPMCvE6OpP3KmCcDXPJ1cCZ4",
  // });

  // const [tagFilterParams, setAllTypeParams] = useState({
  //   cid: "svideo",
  //   vv: "b7b1792f83a7b4406178fc8ee8321d62",
  //   pub: "1745667888581",
  // });

  // const { data: mainMenuDatas, isLoading } = useQuery({
  //   queryKey: ["main-menus"],
  //   queryFn: () => {
  //     return getMainMenus({
  //       ...params,
  //     });
  //   },
  // });

  // const { data: tagFilterDatas } = useQuery({
  //   queryKey: ["tag-filter"],
  //   queryFn: () => {
  //     return getTagFilter({
  //       ...tagFilterParams,
  //     });
  //   },
  // });

  // const { data: tagFilters } = tagFilterDatas || {};

  // const allTags = tagFilters?.info;

  // console.log(allTags, "allTags");
  return (
    <div className="tags-homepage d-flex flex-column flex-md-row justify-content-start mb-4 gap-md-2 gap-4">
      <div className="tags-homepage-left-1">
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="0" className={arrPathName[2] === 'svideo' ? "small-video-active item-default" : "item-default"}>
            <Link
              href={
                routes.list + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <small className="text-white-hover"> 小视频 </small>
            </Link>
          </CListGroupItem>
        </CListGroup>
      </div>
      <div className="tags-homepage-center-1">
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="0" className={arrPathName[2] === 'japan' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listJapan + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-white-hover">日本</span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="1" className={arrPathName[2] === 'european' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listEuropean + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-white-hover">欧美</span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="2" className={arrPathName[2] === 'cartoon' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listCartoon + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-white-hover">卡通</span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="3" className={arrPathName[2] === 'domestic' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listDomestic + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-white-hover">国产</span>
            </Link>
          </CListGroupItem>
          <CListGroupItem key="4" className={arrPathName[2] === 'gay' ? "small-video-active" : ""}>
            <Link
              href={
                routes.listGay + "?" + deleteQueryString("tag", `${tag}`)
              }
              className="text-white">
              <span className="text-white-hover">男同</span>
            </Link>
          </CListGroupItem>
        </CListGroup>
      </div>
    </div>
  );
};
