"use client";

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useState } from "react";
import _ from "lodash-es";
import { getMainMenus, getTagFilter } from "@/apis/homepage";
import { useQuery } from "react-query";
import { usePathname, useSearchParams } from "next/navigation";

export const TagsAllPreferencesListPage = (props) => {
  const { cidValue, title = "" } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let tag = searchParams.get("tag");
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const [params, setParams] = useState({
    cinema: 2,
    cid: "0,2,10",
    vv: "6e0e0d0fff56447dd1c8b456b076cf54",
    pub: "CJSqD3aqDZGmDYuoCp8tDrya9QzCJOtBZ4tEIurD2uoDJDVOZHaCJ0sEMCrEM9bD6GvOJavCJSrPZ1XOcPZD3CrOJ9VPZKpEM9aCsGqPM8tPc5ZPMCvE6OpP3KmCcDXPJ1cCZ4",
  });

  let cidValueString = 'svideo';

  const paramTagBycid = {};
  switch (cidValue) {
    case 'svideo':
      paramTagBycid.cid = cidValueString;
      paramTagBycid.vv = '2e960c262698e409e3455c5a250395b6';
      paramTagBycid.pub = 'CJSrCJOuDJapD2urD30oNqj8Np4sDounDpakDJGkCZKpNpWvP3arCMOrDZWuDZHYCMHYDJbYDJOsOsOnCJaoOMGmNpbZCZ0oCJasC3PbDpCvPJTYCsDYDZDcCJKqE39cCpOm';
      break;
    case 'japan':
      paramTagBycid.cid = '0,2,10,85';
      paramTagBycid.vv = 'abf08eb686694e226810bbbd816db46c';
      paramTagBycid.pub = 'CJSqE38qCp4nC2utCZGqCbyggQzDZKkD3akCpWkCJGoNpSoCcOmOMPYPZGnCpHXDZSvCZCtE30mOJCuP35aCZ4mNs9cC68mCc5bDZatDZSuCJKuDp0oDM4oCsOnPcHYOZav';
      break;
    case 'european':
      paramTagBycid.cid = '0,2,10,86';
      paramTagBycid.vv = 'a80a22e471c2ba91c81b5872efbd4e4c';
      paramTagBycid.pub = 'CJSqE3CpE3CuCounE34mD5ya9QzCJOtBZ4tEIurD2uoDJDVPJDaE6GqDpLaPJCoD69aCpWrOp4oE30pDJLYDpOmCZLVDJbXC31ZOs5aEJ0nEJHaDJ1XOpKrDpGuP65XP68qCp2';
      break;
    case 'cartoon':
      paramTagBycid.cid = '0,2,10,88';
      paramTagBycid.vv = 'af83ddc3003f9a1dff41a1d24e1e320a';
      paramTagBycid.pub = 'CJSqE3CpE3CuCounE34mD5ya9QzCJOtBZ4tEIurD2uoDJDVPJDaE6GqDpLaPJCoD69aCpWrOp4oE30pDJLYDpOmCZLVDJbXC31ZOs5aEJ0nEJHaDJ1XOpKrDpGuP65XP68qCp2';
      break;
    case 'domestic':
      paramTagBycid.cid = '0,2,10,87';
      paramTagBycid.vv = '28d65315dd194bd9adf359d18300ac90';
      paramTagBycid.pub = 'CJSqE3CpE3CuCounE34mD5ya9QzCJOtBZ4tEIurD2uoDJDVPJDaE6GqDpLaPJCoD69aCpWrOp4oE30pDJLYDpOmCZLVDJbXC31ZOs5aEJ0nEJHaDJ1XOpKrDpGuP65XP68qCp2';
      break;
  }

  const [tagFilterParams, setAllTypeParams] = useState(paramTagBycid);


  // const { data: mainMenuDatas, isLoading } = useQuery({
  //   queryKey: ["main-menus"],
  //   queryFn: () => {
  //     return getMainMenus({
  //       ...params,
  //     });
  //   },
  // });  

  const { data: tagFilterDatas } = useQuery({
    queryKey: ["tag-filter"],
    queryFn: () => {
      return getTagFilter({
        ...tagFilterParams,
      });
    },
  });

  const { data: tagFilters } = tagFilterDatas || {};

  const allTags = tagFilters?.info;
  const excluded = [null, undefined, ''];

  return (
    <div className="tags-homepage d-flex flex-column flex-md-row justify-content-start mb-4 gap-md-2 gap-4">
      <div className="tags-homepage-left-2 ">
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem
            key="0"
            className={
              excluded.includes(tag) ? "tag-active item-tag-default" : "item-tag-default"
            }
          >
            <Link href={
              pathname + "?" + deleteQueryString("tag", `${tag}`)
            }
              className="text-white">
              <small className="text-white-hover"> 全部喜好 </small>
            </Link>
          </CListGroupItem>
        </CListGroup>
      </div>
      <div className="tags-homepage-center-2 ">
        <CListGroup layout="horizontal" className=" flex-wrap">
          {_.map(allTags, (item, index) => {
            return (
              <CListGroupItem
                key={index}
                className={tag === item.title ? "tag-active" : ""}
              >
                <Link
                  href={
                    pathname + "?" + createQueryString("tag", `${item.title}`)
                  }
                  className="text-white"
                >
                  <span className="text-white-hover">{item.title}</span>
                </Link>
              </CListGroupItem>
            );
          })}
        </CListGroup>
      </div>
    </div>
  );
};
