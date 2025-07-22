"use client";

import "./styles.scss";
import { useState } from "react";
import _ from "lodash-es";
import { useQuery } from "react-query";
import { getVideoRank } from "@/apis/homepage";
import { FaFireFlameCurved } from "react-icons/fa6";
import { routes } from "@/contants/routes";


export const RowItemRank = (props) => {
  const { } = props;

  const [activeTabJapan, setActiveTabJapan] = useState('week');
  const [activeTabEuro, setActiveTabEuro] = useState('week');
  const [activeTabDomestic, setActiveTabDomestic] = useState('week');
  const [activeTabCartoon, setActiveTabCartoon] = useState('week');


  const [params, setParams] = useState({
    key: "All",
    cinema: 2,
    vv: "4cc77e7ec7bde2aa6cfdc6f7505472db",
    pub: 1751334683857
  });

  const { data: videoRankDatas, isLoading: firstIsLoading } = useQuery({
    queryKey: ['get-list-video-rank', params],
    queryFn: () => {
      return getVideoRank(params)
    },
    enabled: !!params
  })

  const videoJapanDatas = videoRankDatas?.data?.info['true_0,2,10,85'] || {};
  const videoEuropeanDatas = videoRankDatas?.data?.info['true_0,2,10,86'] || {};
  const videoDomesticDatas = videoRankDatas?.data?.info['true_0,2,10,87'] || {};
  const videoCartoonDatas = videoRankDatas?.data?.info['true_0,2,10,88'] || {};

  let videoDataJapanShow = [];
  switch (activeTabJapan) {
    case 'week':
      videoDataJapanShow = videoJapanDatas.week;
      break;
    case 'month':
      videoDataJapanShow = videoJapanDatas.month;
      break;
    case 'year':
      videoDataJapanShow = videoJapanDatas.year;
      break;
  }

  let videoDataEuroShow = [];
  switch (activeTabEuro) {
    case 'week':
      videoDataEuroShow = videoEuropeanDatas.week;
      break;
    case 'month':
      videoDataEuroShow = videoEuropeanDatas.month;
      break;
    case 'year':
      videoDataEuroShow = videoEuropeanDatas.year;
      break;
  }

  let videoDataDomesticShow = [];
  switch (activeTabDomestic) {
    case 'week':
      videoDataDomesticShow = videoDomesticDatas.week;
      break;
    case 'month':
      videoDataDomesticShow = videoDomesticDatas.month;
      break;
    case 'year':
      videoDataDomesticShow = videoDomesticDatas.year;
      break;
  }

  let videoDataCartoonShow = [];
  switch (activeTabCartoon) {
    case 'week':
      videoDataCartoonShow = videoCartoonDatas.week;
      break;
    case 'month':
      videoDataCartoonShow = videoCartoonDatas.month;
      break;
    case 'year':
      videoDataCartoonShow = videoCartoonDatas.year;
      break;
  }

  return (
    <div className="ranking-content">
      <div>
        <app-column-ranking>
          <div className="column-container">
            <div className="column-header">
              <div className="content-ranking-title">日本榜</div>
              <div className="ranking-filter">
                {/* <a><span className="filter-type current">周</span></a>
                  <a><span className="filter-type">月</span></a>
                  <a><span className="filter-type">年</span></a> */}
                <span
                  onMouseEnter={() => setActiveTabJapan('week')}
                  className={activeTabJapan === 'week' ? 'filter-type current' : 'filter-type'}
                >
                  周
                </span>
                <span
                  onMouseEnter={() => setActiveTabJapan('month')}
                  className={activeTabJapan === 'month' ? 'filter-type current' : 'filter-type'}
                >
                  月
                </span>
                <span
                  onMouseEnter={() => setActiveTabJapan('year')}
                  className={activeTabJapan === 'year' ? 'filter-type current' : 'filter-type'}
                >
                  年
                </span>
              </div>
            </div>
            <div className="column-content">
              {_.map(videoDataJapanShow?.slice(0, 9), (item, index) => {
                let { title, imgPath, cid, year, free, hot, contxt } = item;
                let numberRank = index + 1;
                let styleBackgroundRankNum = { background: `url(/${numberRank}.png) center center no-repeat` };
                // imgPath = imgPath.replace('s.gif', '.gif');
                let imgURL = "https://static.wyav.tv/" + imgPath;

                // let imgURL = "https://static.wyav.tv/upload/av/202504290024462472754.gif?w=216&h=309&format=jpg&mode=stretch";
                let viewConvert = hot > 10000 ? `${(hot / 10000).toFixed(1)} 万` : hot;
                if (index <= 2) {
                  return (
                    index <= 2 &&
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <div className="cover">
                            </div>
                            <div className="cover-ctn">
                              <a href={`${routes.play}/${contxt}`}>
                                <img className="cover-path rank-all-item-thumbnail" src={imgURL}></img>
                              </a>
                            </div>
                          </div>
                          <div className="top3-context">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>
                            <div className="d-flex">
                              <div className="top3-info-box">
                                {cid}
                              </div>
                              <div className="top3-info-box">
                                {year}
                              </div>
                              <div className="top3-info-box">
                                {free}
                              </div>
                              <div className="top3-info-box">
                                骑兵
                              </div>
                            </div>
                            <div className="hot-number">
                              <FaFireFlameCurved className="text-danger"></FaFireFlameCurved> {viewConvert}
                            </div>
                          </div>
                        </div>
                      </app-column-top3>
                    </div>
                  )
                } else {
                  return (
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>

                          </div>

                        </div>
                      </app-column-top3>
                    </div>
                  )
                }

              })}
            </div>
          </div>
        </app-column-ranking>
      </div>

      <div>
        <app-column-ranking>
          <div className="column-container">
            <div className="column-header">
              <div className="content-ranking-title">欧美榜</div>
              <div className="ranking-filter">
                <span
                  onMouseEnter={() => setActiveTabEuro('week')}
                  className={activeTabEuro === 'week' ? 'filter-type current' : 'filter-type'}
                >
                  周
                </span>
                <span
                  onMouseEnter={() => setActiveTabEuro('month')}
                  className={activeTabEuro === 'month' ? 'filter-type current' : 'filter-type'}
                >
                  月
                </span>
                <span
                  onMouseEnter={() => setActiveTabEuro('year')}
                  className={activeTabEuro === 'year' ? 'filter-type current' : 'filter-type'}
                >
                  年
                </span>
              </div>
            </div>
            <div className="column-content">
              {_.map(videoDataEuroShow?.slice(0, 9), (item, index) => {
                let { title, imgPath, cid, year, free, hot, contxt } = item;
                let numberRank = index + 1;
                let styleBackgroundRankNum = { background: `url(/${numberRank}.png) center center no-repeat` };
                let imgURL = "https://static.wyav.tv/" + imgPath;

                let viewConvert = hot > 10000 ? `${(hot / 10000).toFixed(1)} 万` : hot;
                if (index <= 2) {
                  return (
                    index <= 2 &&
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <div className="cover">
                            </div>
                            <div className="cover-ctn">
                              <a href={`${routes.play}/${contxt}`}>
                                <img className="cover-path rank-all-item-thumbnail" src={imgURL}></img>
                              </a>
                            </div>
                          </div>
                          <div className="top3-context">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>
                            <div className="d-flex">
                              <div className="top3-info-box">
                                {cid}
                              </div>
                              <div className="top3-info-box">
                                {year}
                              </div>
                              <div className="top3-info-box">
                                {free}
                              </div>
                              <div className="top3-info-box">
                                骑兵
                              </div>
                            </div>
                            <div className="hot-number">
                              <FaFireFlameCurved className="text-danger"></FaFireFlameCurved> {viewConvert}
                            </div>
                          </div>
                        </div>
                      </app-column-top3>
                    </div>
                  )
                } else {
                  return (
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>

                          </div>

                        </div>
                      </app-column-top3>
                    </div>
                  )
                }

              })}
            </div>
          </div>
        </app-column-ranking>
      </div>

      <div>
        <app-column-ranking>
          <div className="column-container">
            <div className="column-header">
              <div className="content-ranking-title">国产榜</div>
              <div className="ranking-filter">
                <span
                  onMouseEnter={() => setActiveTabDomestic('week')}
                  className={activeTabDomestic === 'week' ? 'filter-type current' : 'filter-type'}
                >
                  周
                </span>
                <span
                  onMouseEnter={() => setActiveTabDomestic('month')}
                  className={activeTabDomestic === 'month' ? 'filter-type current' : 'filter-type'}
                >
                  月
                </span>
                <span
                  onMouseEnter={() => setActiveTabDomestic('year')}
                  className={activeTabDomestic === 'year' ? 'filter-type current' : 'filter-type'}
                >
                  年
                </span>
              </div>
            </div>
            <div className="column-content">
              {_.map(videoDataDomesticShow?.slice(0, 9), (item, index) => {
                let { title, imgPath, cid, year, free, hot, contxt } = item;
                let numberRank = index + 1;
                let styleBackgroundRankNum = { background: `url(/${numberRank}.png) center center no-repeat` };
                let imgURL = "https://static.wyav.tv/" + imgPath;
                let viewConvert = hot > 10000 ? `${(hot / 10000).toFixed(1)} 万` : hot;
                if (index <= 2) {
                  return (
                    index <= 2 &&
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <div className="cover">
                            </div>
                            <div className="cover-ctn">
                              <a href={`${routes.play}/${contxt}`}>
                                <img className="cover-path rank-all-item-thumbnail" src={imgURL}></img>
                              </a>
                            </div>
                          </div>
                          <div className="top3-context">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>
                            <div className="d-flex">
                              <div className="top3-info-box">
                                {cid}
                              </div>
                              <div className="top3-info-box">
                                {year}
                              </div>
                              <div className="top3-info-box">
                                {free}
                              </div>
                              <div className="top3-info-box">
                                骑兵
                              </div>
                            </div>
                            <div className="hot-number">
                              <FaFireFlameCurved className="text-danger"></FaFireFlameCurved> {viewConvert}
                            </div>
                          </div>
                        </div>
                      </app-column-top3>
                    </div>
                  )
                } else {
                  return (
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>

                          </div>

                        </div>
                      </app-column-top3>
                    </div>
                  )
                }

              })}
            </div>
          </div>
        </app-column-ranking>
      </div>


      <div>
        <app-column-ranking>
          <div className="column-container">
            <div className="column-header">
              <div className="content-ranking-title">卡通榜</div>
              <div className="ranking-filter">
                <span
                  onMouseEnter={() => setActiveTabCartoon('week')}
                  className={activeTabCartoon === 'week' ? 'filter-type current' : 'filter-type'}
                >
                  周
                </span>
                <span
                  onMouseEnter={() => setActiveTabCartoon('month')}
                  className={activeTabCartoon === 'month' ? 'filter-type current' : 'filter-type'}
                >
                  月
                </span>
                <span
                  onMouseEnter={() => setActiveTabCartoon('year')}
                  className={activeTabCartoon === 'year' ? 'filter-type current' : 'filter-type'}
                >
                  年
                </span>
              </div>
            </div>
            <div className="column-content">
              {_.map(videoDataCartoonShow?.slice(0, 9), (item, index) => {
                let { title, imgPath, cid, year, free, hot, contxt } = item;
                let numberRank = index + 1;
                let styleBackgroundRankNum = { background: `url(/${numberRank}.png) center center no-repeat` };
                let imgURL = "https://static.wyav.tv/" + imgPath;
                let viewConvert = hot > 10000 ? `${(hot / 10000).toFixed(1)} 万` : hot;
                if (index <= 2) {
                  return (
                    index <= 2 &&
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <div className="cover">
                            </div>
                            <div className="cover-ctn">
                              <a href={`${routes.play}/${contxt}`}>
                                <img className="cover-path rank-all-item-thumbnail" src={imgURL}></img>
                              </a>
                            </div>
                          </div>
                          <div className="top3-context">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>
                            <div className="d-flex">
                              <div className="top3-info-box">
                                {cid}
                              </div>
                              <div className="top3-info-box">
                                {year}
                              </div>
                              <div className="top3-info-box">
                                {free}
                              </div>
                              <div className="top3-info-box">
                                骑兵
                              </div>
                            </div>
                            <div className="hot-number">
                              <FaFireFlameCurved className="text-danger"></FaFireFlameCurved> {viewConvert}
                            </div>
                          </div>
                        </div>
                      </app-column-top3>
                    </div>
                  )
                } else {
                  return (
                    <div style={{ width: "fit-content" }}>
                      <app-column-top3>
                        <div className="top3-container">
                          <div className="rank-number" style={styleBackgroundRankNum}></div>
                          <div className="top3-cover">
                            <a className="top3-title" href={`${routes.play}/${contxt}`} title={title}><p className="text-pink-hover text-ellipsis-item-rank-all">{title}</p></a>

                          </div>

                        </div>
                      </app-column-top3>
                    </div>
                  )
                }

              })}
            </div>
          </div>
        </app-column-ranking>
      </div>

    </div>

  );
};
