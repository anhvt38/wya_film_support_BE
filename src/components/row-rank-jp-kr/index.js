"use client";

import "./styles.scss";
import { useEffect, useState } from "react";
import _ from "lodash-es";
import { useQuery } from "react-query";
import { getVideoRank } from "@/apis/homepage";
import { FaFireFlameCurved } from "react-icons/fa6";
import { routes } from "@/contants/routes";
import { AiFillDislike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";


export const RowRankJapanKorea18 = (props) => {
  const { cidValue } = props;

  const [visibleCountJapan, setVisibleCountJapan] = useState(10);


  const [params, setParams] = useState({
    key: "All",
    cinema: 2,
    vv: "59790f28b67c7bb970ff3331274fddd2",
    pub: 1751352226849
  });

  const { data: videoRankDatas, isLoading: firstIsLoading } = useQuery({
    queryKey: ['get-list-video-rank', params],
    queryFn: () => {
      return getVideoRank(params)
    },
    enabled: !!params
  })

  const videoDatas = videoRankDatas?.data || {};
  let videoShowDatas = [];
  switch (cidValue) {
    case 'japankorea':
      videoShowDatas = videoRankDatas?.data?.info['true_0,2,10,85'].day;
      break;
    case 'western':
      videoShowDatas = videoRankDatas?.data?.info['true_0,2,10,86'].day;
      break;
    case 'china':
      videoShowDatas = videoRankDatas?.data?.info['true_0,2,10,87'].day;
      break;
    case 'cartoon':
      videoShowDatas = videoRankDatas?.data?.info['true_0,2,10,88'].day;
      break;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setVisibleCountJapan((prev) => (prev >= 50 ? prev : prev + 10));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // console.log('vissss ', visibleCountJapan);


  return (
    <div className="ranking-content row-style">
      {_.map(videoShowDatas?.slice(0, visibleCountJapan), (item, index) => {

        let { title, imgPath, cid, year, free, hot, contxt, masaike, addTime, starring, label, comments, favoriteCount, dd, dc } = item;
        let numberRank = index + 1;
        // let styleBackgroundRankNum = { background: `url(/${numberRank}.png) center center no-repeat` };
        let imgURL = "https://static.wyav.tv/" + imgPath;
        let viewConvert = hot > 10000 ? `${(hot / 10000).toFixed(1)} 万` : hot;
        if (index <= 2) {
          return (
            index <= 2 &&
            <div>
              <app-row-ranking>
                <div className="row-container">
                  <div className="ranking-number-ctn">
                    <div className={numberRank === 1 || numberRank === 2 || numberRank === 3 ? `ranking-number top${numberRank}` : "ranking-number"}>
                      {numberRank}
                    </div>
                  </div>
                  <div className="ranking-cover">
                    <div className="cover-jp">

                    </div>
                    <div className="cover-ctn-jp">
                      <a href={`${routes.play}/${contxt}`}>
                        <img className="cover-path-jp rank-jp-kr-item-thumbnail" src={imgURL}></img>
                      </a>
                    </div>
                  </div>
                  <div className="ranking-context">
                    <div className="top-header">
                      <a className="top-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover">{title}</p></a>
                      <div className="top-tags ng-star-inserted">
                        <span className="tag-box">{cid}</span>
                        <span className="tag-box">{year}</span>
                        <span className="tag-box">{free}</span>
                        <span className="tag-box">骑兵</span>
                      </div>
                    </div>
                    <div className="top-info">添加：{addTime}</div>
                    <div className="top-info ng-star-inserted">标签：{label}</div>
                    <div className="top-info ng-star-inserted">女优：{starring}</div>
                    <div className="top-footer">
                      <div className="top-icon">
                        <BiMessageDots /><span>{comments}</span>
                        <AiFillLike /><span>{dd}</span>
                        <AiFillDislike /><span>{dc}</span>
                        <FaFireFlameCurved></FaFireFlameCurved> <span>{viewConvert}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </app-row-ranking>
            </div>
          )
        } else {
          return (
            <div>
              <app-row-ranking>
                <div className="row-container mini-ctn animation">
                  <div className="ranking-number-ctn">
                    <div className="ranking-number">
                      {numberRank}
                    </div>
                  </div>
                  <div className="ranking-context ranking-context-nornal">
                    <div className="top-header">
                      <a className="top-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover">{title}</p></a>
                      <div className="top-tags ng-star-inserted">
                        <span className="tag-box">{cid}</span>
                        <span className="tag-box">{year}</span>
                        <span className="tag-box">{free}</span>
                        <span className="tag-box">骑兵</span>
                      </div>
                    </div>
                    <div className="top-footer-nornal">
                      <div className="top-icon">
                        <AiOutlineComment /><span>{comments}</span>
                        <AiFillLike /><span>{dd}</span>
                        <AiFillDislike /><span>{dc}</span>
                        <FaFireFlameCurved></FaFireFlameCurved> <span>{viewConvert}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </app-row-ranking>
            </div>
          )
        }
      })}
    </div>
  );
};
