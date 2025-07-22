"use client";
import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { useCallback, useState } from "react";
import _ from 'lodash-es';
import { usePathname, useSearchParams } from "next/navigation";
import { LiaSortAmountDownSolid, LiaSortAmountUpAltSolid } from "react-icons/lia";

export const TabsCelebrityPage = (props) => {
  const { title = '' } = props;

  let pathname = usePathname();
  const searchParams = useSearchParams();
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
    window.history.pushState({}, '', `${pathname}?${params.toString()}`);
  }, [pathname, searchParams]);

  return (
    <div className="tags-homepage d-flex flex-column flex-md-row justify-content-between my-4 gap-md-2 gap-4">
      <div className="tags-homepage-left-6">
        <CListGroup layout="horizontal" className="flex-wrap">
          <CListGroupItem key="1"
            className={
              excluded.includes(orderBy) ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathname + "?" + deleteQueryString("orderBy")} className="text-color-main item-tabs-link-1">
              <span className="text-white-hover">添加时间</span>
            </Link>
            {excluded.includes(orderBy)
              ? <div
                onClick={toggleSort}
                className="text-white"
              >
                {sortDirection === 'asc'
                  ? <LiaSortAmountDownSolid />
                  : <LiaSortAmountUpAltSolid />}
              </div>
              : <div style={{ marginRight: "20px" }}></div>
            }

          </CListGroupItem>

          <CListGroupItem
            key="3"
            className={
              orderBy == `3` ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathname + '?' + createQueryString('orderBy', `3`)} className="text-color-main item-tabs-link-1">
              <span className="text-white-hover">字母排序</span>
            </Link>
            {orderBy == `3`
              ?
              <div
                onClick={toggleSort}
                className="text-white"
              >
                {sortDirection === 'asc'
                  ? <LiaSortAmountDownSolid />
                  : <LiaSortAmountUpAltSolid />}
              </div>
              : <div style={{ "margin-right": "20px" }}></div>
            }
          </CListGroupItem>

          <CListGroupItem key="2"
            className={
              orderBy == `2` ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathname + '?' + createQueryString('orderBy', `2`)} className="text-color-main item-tabs-link-1">
              <span className="text-white-hover">人气高低</span>
            </Link>
            {orderBy == `2`
              ?
              <div
                onClick={toggleSort}
                className="text-white"
              >
                {sortDirection === 'asc'
                  ? <LiaSortAmountDownSolid />
                  : <LiaSortAmountUpAltSolid />}
              </div>
              : <div style={{ "margin-right": "20px" }}></div>
            }
          </CListGroupItem>

          <CListGroupItem key="1"
            className={
              orderBy == `1` ? "item-tabs-1 item-tabs-active" : "item-tabs-1"
            }
          >
            <Link href={pathname + '?' + createQueryString('orderBy', `1`)} className="text-color-main item-tabs-link-1">
              <span className="text-white-hover">更新时间</span>
            </Link>
            {orderBy == `1`
              ?
              <div
                onClick={toggleSort}
                className="text-white"
              >
                {sortDirection === 'asc'
                  ? <LiaSortAmountDownSolid />
                  : <LiaSortAmountUpAltSolid />}
              </div>
              : <div style={{ "margin-right": "20px" }}></div>
            }
          </CListGroupItem>
        </CListGroup>
      </div>
    </div>
  );
}
